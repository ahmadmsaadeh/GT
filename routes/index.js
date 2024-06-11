const express = require('express');
const router = express.Router();

//this is comment
const resourceRouts = require('./resourcesRouts');
const volunteerRouts = require('./volunteersRouts');
const weatherRouter = require('./weatherRouter');
const usersRouter = require('./userRoutes');
const userrolesRouter = require('./userRoleRoutes');
const gardenMembershipRoutes = require('./gardenMembershipRoutes');
const LocalPartnershipRoutes = require('./LocalPartnershipRoutes');
const KnowledgeBaseRoutes = require('./KnowledgeBaseRoutes');
const soilAndCropRoutes = require('./soilAndCropRoutes');
const cropRoutes = require('./cropRoutes');
const cropScheduleRoutes = require('./cropScheduleRoutes');
const gardenRoutes = require('./gardenRoutes');
const authRoutes = require('./authRoutes');


router.use('/auth', authRoutes);
router.use('/Weather', weatherRouter);
router.use('/Resources', resourceRouts);
router.use('/Volunteers', volunteerRouts);
router.use('/users', usersRouter);
router.use('/userroles', userrolesRouter);
router.use('/gardenMembership', gardenMembershipRoutes);
router.use('/LocalPartnership', LocalPartnershipRoutes);
router.use('/KnowledgeBase', KnowledgeBaseRoutes);
router.use('/SoilAndCrop', soilAndCropRoutes);
router.use('/Crop', cropRoutes);
router.use('/CropSchedule', cropScheduleRoutes);
router.use('/garden', gardenRoutes);

module.exports = router;
