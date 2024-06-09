const express = require('express');
const volunteersController = require('../controllers/volunteersController');

const router = express.Router();

router
.route('/')
.get(volunteersController.getAllVolunteers)
.post(volunteersController.addNewVolunteer);

router
.route('/:id')
.get(volunteersController.getVolunteerByID)
.delete(volunteersController.deleteVolunteer);

module.exports = router;