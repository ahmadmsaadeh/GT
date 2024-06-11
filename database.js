const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('greenthumb', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  // Prevent dropping existing tables
  
});

module.exports = sequelize;