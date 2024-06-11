const express = require('express');
const sequelize = require('./database');
const models = require('./models');
const resourceRouts = require('./routs/resourcesRouts');
const volunteerRouts = require('./routs/volunteersRouts');
const weatherRouter = require('./routs/weatherRouter');
const usersRouter = require('./routs/users');
const userrolesRouter = require('./routs/usersroles');
const GardenMembershipRouter = require('./routs/GardenMembership');
const { getAllKnowledgeBases, getKnowledgeBasesById, addKnowledgeBases, DeleteKnowledge, UpdateKnowledge } = require('./controllers/knowledgebasesController');
const { getAllLocalPartnership, getPartnershipById, addPartnership, DeletePartnership, UpdatePartnership } = require('./controllers/localpartnershipsController');
const { getGardenSoilData } = require('./controllers/SoilAndPestMgmt');


const app = express();
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


app.use('/Weather', weatherRouter);
app.use('/Resources', resourceRouts);
app.use('/Volunteers', volunteerRouts);
app.use('/users', usersRouter);
app.use('/usersroles', userrolesRouter);
app.use('/GardenMembership', GardenMembershipRouter);
///////////////////////////////////////////////////////////////
app.get('/KnowledgeBases', getAllKnowledgeBases);
app.get('/KnowledgeBasesById', getKnowledgeBasesById);
app.post('/AddKnowledge', addKnowledgeBases);
app.post('/DeleteKnowledge', DeleteKnowledge);
app.post('/UpdateKnowledge', UpdateKnowledge);
//////////////////////////////////////////////////////////
app.get('/LocalPartnerships', getAllLocalPartnership);
app.get('/PartnershipById', getPartnershipById);
app.post('/AddPartnership', addPartnership);
app.post('/DeletePartnership', DeletePartnership);
app.post('/UpdatePartnership', UpdatePartnership);
/////////////////////////////////////////////////////////
app.get('/getGardenSoilData', getGardenSoilData);


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
