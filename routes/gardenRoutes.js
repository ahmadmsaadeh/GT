const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

router.get('/', gardenController.getAllGardens);
router.post('/', gardenController.createGarden);
router.get('/:id', gardenController.getGardenById);
router.put('/:id', gardenController.updateGarden);
router.delete('/:id', gardenController.deleteGarden);

module.exports = router;