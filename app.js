const express = require('express');
const sequelize = require('./database');
const models = require('./models');
const resourceRouts = require('./routes/resourcesRouts');
const volunteerRouts = require('./routes/volunteersRouts');
const weatherRouter = require('./routes/weatherRouter');
const usersRouter = require('./routes/users');
const userrolesRouter = require('./routes/usersroles');
const gardenMembershipRoutes = require('./routes/gardenMembershipRoutes');
const LocalPartnershipRoutes = require('./routes/LocalPartnershipRoutes');
const KnowledgeBaseRoutes = require('./routes/KnowledgeBaseRoutes');
const soilAndCropRoutes = require('./routes/soilAndCropRoutes');
const app = express();
const bodyParser = require('body-parser');


const port = 3000;

// Middleware to add request time
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

app.use(bodyParser.json());
app.use('/api/Weather', weatherRouter);
app.use('/api/Resources', resourceRouts);
app.use('/api/Volunteers', volunteerRouts);
app.use('/api/users', usersRouter);
app.use('/api/usersroles', userrolesRouter);
app.use('/api/gardenMembership', gardenMembershipRoutes);
app.use('/api', LocalPartnershipRoutes);
app.use('/api', KnowledgeBaseRoutes);
app.use('/api', soilAndCropRoutes);

app.listen(port, async () => {
    console.log(`App listening on port ${port} ...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Synchronize models with the database without dropping tables
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
