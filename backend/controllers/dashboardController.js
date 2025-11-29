const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');

exports.getEmployeeStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const leaves = await LeaveRequest.find({ userId });
    
    const pending = leaves.filter(l => l.status === 'pending').length;
    const approved = leaves.filter(l => l.status === 'approved').length;
    const rejected = leaves.filter(l => l.status === 'rejected').length;
    
    // Fetch latest user balance
    const user = await User.findById(userId);

    res.json({
      pending,
      approved,
      rejected,
      balance: user.leaveBalance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getManagerStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const pendingRequests = await LeaveRequest.countDocuments({ status: 'pending' });
    const approvedRequests = await LeaveRequest.countDocuments({ status: 'approved' });
    
    // Calculate employees on leave today
    const today = new Date();
    const onLeaveToday = await LeaveRequest.countDocuments({
      status: 'approved',
      startDate: { $lte: today },
      endDate: { $gte: today }
    });

    res.json({
      totalEmployees,
      pendingRequests,
      approvedRequests,
      onLeaveToday
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
