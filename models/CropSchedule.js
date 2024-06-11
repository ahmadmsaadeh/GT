const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Crop = require('./Crop');

const CropSchedule = sequelize.define('CropSchedule', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  crop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Crop,
      key: 'id'
    }
  },
  schedule: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT }
});

module.exports = CropSchedule;
