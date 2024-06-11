const { Router } = require('express');
const gardenMembershipController = require('../controllers/gardenMembershipController');

const router = Router();

router.get('/', gardenMembershipController.getAllGardenMemberships);
router.get('/:id', gardenMembershipController.getGardenMembershipById);
router.get('/user_id/:id', gardenMembershipController.getGardenMembershipByUserId);
router.get('/garden_id/:id', gardenMembershipController.getGardenMembershipByGardenId);
router.delete('/user_id/:user_id/garden_id/:garden_id', gardenMembershipController.deleteGardenMembership);
router.put('/garden_id/:id', gardenMembershipController.updateGardenMembershipGardenId);
router.put('/user_id/:id', gardenMembershipController.updateGardenMembershipUserId);
router.post('/', gardenMembershipController.createGardenMembership);

module.exports = router;
