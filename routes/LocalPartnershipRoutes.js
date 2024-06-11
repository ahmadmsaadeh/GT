// routes/LocalPartnershipRoutes.js
const express = require('express');
const router = express.Router();
const LocalPartnershipController = require('../controllers/LocalPartnershipController');

router.get('/LocalPartnerships', LocalPartnershipController.getAllLocalPartnership);
router.get('/PartnershipById', LocalPartnershipController.getPartnershipById);
router.post('/AddPartnership', LocalPartnershipController.addPartnership);
router.post('/DeletePartnership', LocalPartnershipController.deletePartnership);
router.post('/UpdatePartnership', LocalPartnershipController.updatePartnership);

module.exports = router;
