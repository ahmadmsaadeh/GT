const express = require('express');
const sequelize = require('./database');
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

app.use('/api', routes);

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
