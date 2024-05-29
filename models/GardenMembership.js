const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Garden = require('./Garden');

const GardenMembership = sequelize.define('GardenMembership', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  garden_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Garden,
      key: 'id'
    }
  }
});

module.exports = GardenMembership;
