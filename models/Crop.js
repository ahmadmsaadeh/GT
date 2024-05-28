const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Garden = require('./Garden');

const Crop = sequelize.define('Crop', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  garden_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Garden,
      key: 'id'
    }
  },
  plant_date: { type: DataTypes.DATE },
  harvest_date: { type: DataTypes.DATE }
});

module.exports = Crop;
