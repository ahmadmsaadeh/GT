const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);

module.exports = router;
