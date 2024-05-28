const sequelize = require('../database');

const User = require('./User');
const Garden = require('./Garden');
const Crop = require('./Crop');
const Resource = require('./Resource');
const Volunteer = require('./Volunteer');
const GardenMembership = require('./GardenMembership');
const CropSchedule = require('./CropSchedule');
const KnowledgeBase = require('./KnowledgeBase');
const LocalPartnership = require('./LocalPartnership');
const UserRole = require('./UserRole');

// Define relationships
User.hasMany(GardenMembership, { foreignKey: 'user_id' });
GardenMembership.belongsTo(User, { foreignKey: 'user_id' });

Garden.hasMany(GardenMembership, { foreignKey: 'garden_id' });
GardenMembership.belongsTo(Garden, { foreignKey: 'garden_id' });

Garden.hasMany(Crop, { foreignKey: 'garden_id' });
Crop.belongsTo(Garden, { foreignKey: 'garden_id' });

Crop.hasMany(CropSchedule, { foreignKey: 'crop_id' });
CropSchedule.belongsTo(Crop, { foreignKey: 'crop_id' });

KnowledgeBase.belongsTo(User, { foreignKey: 'contributor_id' });
User.hasMany(KnowledgeBase, { foreignKey: 'contributor_id' });

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  User,
  Garden,
  Crop,
  Resource,
  Volunteer,
  GardenMembership,
  CropSchedule,
  KnowledgeBase,
  LocalPartnership,
  UserRole
};
