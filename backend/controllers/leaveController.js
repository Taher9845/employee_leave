const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');

exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, totalDays, reason } = req.body;
    const leave = await LeaveRequest.create({
      userId: req.user._id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason
    });
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.myRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Not found' });
    if (!leave.userId.equals(req.user._id)) return res.status(403).json({ error: 'Not allowed' });
    if (leave.status !== 'pending') return res.status(400).json({ error: 'Only pending requests can be cancelled' });
    await leave.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('leaveBalance');
    res.json(user.leaveBalance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.allRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pendingRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ status: 'pending' }).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Not found' });
    if (leave.status !== 'pending') return res.status(400).json({ error: 'Already processed' });

    const user = await User.findById(leave.userId);
    const field = leave.leaveType === 'sick' ? 'sickLeave' : leave.leaveType === 'casual' ? 'casualLeave' : 'vacation';
    user.leaveBalance[field] = Math.max(0, (user.leaveBalance[field] || 0) - (leave.totalDays || 0));
    await user.save();

    leave.status = 'approved';
    leave.managerComment = req.body.managerComment || '';
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Not found' });
    if (leave.status !== 'pending') return res.status(400).json({ error: 'Already processed' });
    leave.status = 'rejected';
    leave.managerComment = req.body.managerComment || '';
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
