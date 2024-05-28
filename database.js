const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('localhost', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port:'3306'
});

module.exports = sequelize;
