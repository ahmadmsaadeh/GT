const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  role_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
});

module.exports = UserRole;
