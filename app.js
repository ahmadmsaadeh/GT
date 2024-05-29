const express = require('express');
const { User, Garden, Crop, Resource, Volunteer, GardenMembership, CropSchedule, KnowledgeBase, LocalPartnership, UserRole } = require('./models');
const usersRouter = require('./routes/users');
const userrolesRouter = require('./routes/usersroles');
const GardenMembershipRouter = require('./routes/GardenMembership');

const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
app.use('/users', usersRouter);
app.use('/usersroles', userrolesRouter);
app.use('/GardenMembership', GardenMembershipRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port} ...`);
});
