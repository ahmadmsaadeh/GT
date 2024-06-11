const express = require('express');
const router = express.Router();
const cropScheduleController = require('../controllers/cropScheduleController');

router.get('/', cropScheduleController.getAllCropSchedules);
router.post('/', cropScheduleController.createCropSchedule);
router.get('/:id', cropScheduleController.getCropScheduleById);
router.put('/:id', cropScheduleController.updateCropSchedule);
router.delete('/:id', cropScheduleController.deleteCropSchedule);

module.exports = router;