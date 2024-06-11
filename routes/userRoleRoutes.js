const { Router } = require('express');
const userRoleController = require('../controllers/userRoleController');

const router = Router();

router.get('/', userRoleController.getAllUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.delete('/username/:username', userRoleController.deleteUserRoleByUsername);
router.delete('/id/:id', userRoleController.deleteUserRoleById);
router.put('/id/:id', userRoleController.updateUserRoleById);
router.put('/username/:username', userRoleController.updateUserRoleByUsername);

module.exports = router;
