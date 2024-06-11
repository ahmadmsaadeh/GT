const express = require('express');
const router = express.Router();

const resourceRouts = require('./resourcesRouts');
const volunteerRouts = require('./volunteersRouts');
const weatherRouter = require('./weatherRouter');
const usersRouter = require('./users');
const userrolesRouter = require('./usersroles');
const gardenMembershipRoutes = require('./gardenMembershipRoutes');
const LocalPartnershipRoutes = require('./LocalPartnershipRoutes');
const KnowledgeBaseRoutes = require('./KnowledgeBaseRoutes');
const soilAndCropRoutes = require('./soilAndCropRoutes');


router.use('/Weather', weatherRouter);
router.use('/Resources', resourceRouts);
router.use('/Volunteers', volunteerRouts);
router.use('/users', usersRouter);
router.use('/userroles', userrolesRouter);
router.use('/gardenMembership', gardenMembershipRoutes);
router.use('/LocalPartnership', LocalPartnershipRoutes);
router.use('/KnowledgeBase', KnowledgeBaseRoutes);
router.use('/SoilAndCrop', soilAndCropRoutes);

module.exports = router;
