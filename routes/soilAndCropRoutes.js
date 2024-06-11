const express = require('express');
const router = express.Router();
const soilAndCropController = require('../controllers/soilAndCropController');

router.post('/getGardenSoilData', soilAndCropController.getGardenSoilData);

module.exports = router;
