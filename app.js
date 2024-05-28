const express = require('express');
const { User, Garden, Crop, Resource, Volunteer, GardenMembership, CropSchedule, KnowledgeBase, LocalPartnership, UserRole } = require('./models');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(port, () => {
  console.log(`App listening on port ${port} ...`);
});
