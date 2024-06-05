const express = require('express');
const { getAllResources, getResourceByID, addNewResource, deleteResource } = require('./controllers/resourceController');
const sequelize = require('./database');
const models = require('./models');

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

// Routes for resources
app.get('/Resources', getAllResources);
app.get('/Resources/:id', getResourceByID);
app.post('/Resources', addNewResource);
app.delete('/Resources/:id', deleteResource);

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
