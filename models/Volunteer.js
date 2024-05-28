const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Volunteer = sequelize.define('Volunteer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING }
});

module.exports = Volunteer;
