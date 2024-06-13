const express = require('express');
const router = express.Router();
const KnowledgeBaseController = require('../controllers/KnowledgeBaseController');

router.get('/KnowledgeBases', KnowledgeBaseController.getAllKnowledgeBases);
router.get('/KnowledgeBasesById', KnowledgeBaseController.getKnowledgeBasesById);
router.post('/AddKnowledge', KnowledgeBaseController.addKnowledgeBases);
router.delete('/DeleteKnowledge', KnowledgeBaseController.deleteKnowledge);
router.patch('/UpdateKnowledge', KnowledgeBaseController.updateKnowledge);

module.exports = router;
