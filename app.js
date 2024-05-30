const express = require('express');
const { getAllResources, getResourceByID } = require('./controllers/resourceController');
const sequelize = require('./database');
const { User, Resource } = require('./models');

const app = express();
const port = 3000;

// Middleware to add request time
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Route to get all users
app.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Routes for resources
app.get('/Resources', getAllResources);
app.get('/Resources/:id', getResourceByID);

app.listen(port, async () => {
    console.log(`App listening on port ${port} ...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
