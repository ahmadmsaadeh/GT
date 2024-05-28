const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Garden = sequelize.define('Garden', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  conditions: { type: DataTypes.STRING },
  available_plots: { type: DataTypes.INTEGER }
});

module.exports = Garden;
