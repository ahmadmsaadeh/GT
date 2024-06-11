const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Resource = sequelize.define('Resource', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    available_from: { type: DataTypes.DATE }
});

module.exports = Resource;
