const express = require('express');
const router = express.Router();
const LocalPartnershipController = require('../controllers/LocalPartnershipController');

router.get('/LocalPartnerships', LocalPartnershipController.getAllLocalPartnership);
router.get('/PartnershipById', LocalPartnershipController.getPartnershipById);
router.post('/AddPartnership', LocalPartnershipController.addPartnership);
router.delete('/DeletePartnership', LocalPartnershipController.deletePartnership);
router.patch('/UpdatePartnership', LocalPartnershipController.updatePartnership);

module.exports = router;
