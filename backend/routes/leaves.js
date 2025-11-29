const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const auth = require('../middleware/auth');

function ensureManager(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
  if (req.user.role !== 'manager') return res.status(403).json({ error: 'Require manager role' });
  next();
}

router.post('/', auth, leaveController.applyLeave);
router.get('/my-requests', auth, leaveController.myRequests);
router.delete('/:id', auth, leaveController.cancelRequest);
router.get('/balance', auth, leaveController.getBalance);

router.get('/all', auth, ensureManager, leaveController.allRequests);
router.get('/pending', auth, ensureManager, leaveController.pendingRequests);
router.put('/:id/approve', auth, ensureManager, leaveController.approve);
router.put('/:id/reject', auth, ensureManager, leaveController.reject);

module.exports = router;
