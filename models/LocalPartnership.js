const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const LocalPartnership = sequelize.define('LocalPartnership', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  contact: { type: DataTypes.STRING }
});

module.exports = LocalPartnership;
