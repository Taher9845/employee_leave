const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

function ensureManager(req, res, next) {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Require manager role' });
    next();
}

router.get('/employee', auth, dashboardController.getEmployeeStats);
router.get('/manager', auth, ensureManager, dashboardController.getManagerStats);

module.exports = router;
