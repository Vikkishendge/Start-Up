const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

router.get('/', authenticate, authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
