const express = require('express');
const sequelize = require('./database');
const models = require('./models');
const resourceRouts = require('./routes/resourcesRouts');
const volunteerRouts = require('./routes/volunteersRouts');
const weatherRouter = require('./routes/weatherRouter');
const usersRouter = require('./routes/users');
const userrolesRouter = require('./routes/usersroles');
const GardenMembershipRouter = require('./routes/GardenMembership');
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

// Route to get all users
app.get('/', async (req, res) => {
    try {
        const users = await models.User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use(bodyParser.json());
app.use('/api/Weather', weatherRouter);
app.use('/api/Resources', resourceRouts);
app.use('/api/Volunteers', volunteerRouts);
app.use('/api/users', usersRouter);
app.use('/api/usersroles', userrolesRouter);
app.use('/api/GardenMembership', GardenMembershipRouter);
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
