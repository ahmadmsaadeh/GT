const express = require('express');
const resourceController = require('../controllers/resourceController');

const router = express.Router();

router
.route('/')
.get(resourceController.getAllResources)
.post(resourceController.addNewResource);

router
.route('/:id')
.get(resourceController.getResourceByID)
.delete(resourceController.deleteResource);
module.exports = router;
