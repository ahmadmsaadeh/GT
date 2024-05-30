const express = require('express');
const resourceController = require('../controllers/resourceController');

const router = express.Router();

router.param('id', resourceController.checkID);