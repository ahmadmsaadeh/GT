// routes/KnowledgeBaseRoutes.js
const express = require('express');
const router = express.Router();
const KnowledgeBaseController = require('../controllers/KnowledgeBaseController');

router.get('/KnowledgeBases', KnowledgeBaseController.getAllKnowledgeBases);
router.get('/KnowledgeBasesById', KnowledgeBaseController.getKnowledgeBasesById);
router.post('/AddKnowledge', KnowledgeBaseController.addKnowledgeBases);
router.post('/DeleteKnowledge', KnowledgeBaseController.deleteKnowledge);
router.post('/UpdateKnowledge', KnowledgeBaseController.updateKnowledge);

module.exports = router;
