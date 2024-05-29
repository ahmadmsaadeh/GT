const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const KnowledgeBase = sequelize.define('KnowledgeBase', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  contributor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = KnowledgeBase;
