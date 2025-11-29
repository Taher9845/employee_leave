const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token provided' });
    const parts = header.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Malformed token' });
    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
