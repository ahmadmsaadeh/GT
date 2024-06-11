const express = require('express');

const resourceRouts = require('./routes/resourcesRouts');
const volunteerRouts = require('./routes/volunteersRouts');
const weatherRouter = require('./routes/weatherRouter');
const usersRouter = require('./routes/users');
const userrolesRouter = require('./routes/usersroles');
const gardenMembershipRoutes = require('./routes/gardenMembershipRoutes');
const LocalPartnershipRoutes = require('./routes/LocalPartnershipRoutes');
const KnowledgeBaseRoutes = require('./routes/KnowledgeBaseRoutes');
const soilAndCropRoutes = require('./routes/soilAndCropRoutes');

app.use('/api/Weather', weatherRouter);
app.use('/api/Resources', resourceRouts);
app.use('/api/Volunteers', volunteerRouts);
app.use('/api/users', usersRouter);
app.use('/api/usersroles', userrolesRouter);
app.use('/api/gardenMembership', gardenMembershipRoutes);
app.use('/api', LocalPartnershipRoutes);
app.use('/api', KnowledgeBaseRoutes);
app.use('/api', soilAndCropRoutes);