const { where } = require('sequelize');
const KnowledgeBase = require('../models/KnowledgeBase');


exports.getAllKnowledgeBases = async (req, res) => {
    try {
        const knowledge = await KnowledgeBase.findAll();
        res.status(200).json({
            status: 'success',
            results: knowledge.length,
            data: {
                knowledge
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }

};

exports.getKnowledgeBasesById = async (req, res) => {
    try {
        const {id} = req.body;
        const knowledge = await KnowledgeBase.findByPk(id);
        res.status(200).json({
            status: 'success',
            data: {
                knowledge
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.addKnowledgeBases = async (req, res) => {
    try {
        const {title, content, contributor_id } = req.body;
        const knowledge = await KnowledgeBase.create({title, content, contributor_id});
        
        return res.status(200).json({
            status: 'success',
            data: {
                knowledge
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

exports.DeleteKnowledge = async (req, res) => {
    try {
        const { id } = req.body;
        const knowledge = await KnowledgeBase.destroy({where: {id}});
        if (!knowledge) {
            return res.status(404).json({ status: 'fail', message: 'KnowledgeBase not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'KnowledgeBase deleted successfully'
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.UpdateKnowledge = async (req, res) => {
    try {
        const { id } = req.body;

        const updateData = {};
        if (req.body.title !== undefined) {
            updateData.title = req.body.title;
        }
        if (req.body.content !== undefined) {
            updateData.content = req.body.content;
        }
        if (req.body.contributor_id !== undefined) {
            updateData.contributor_id = req.body.contributor_id;
        }

        const [updated] = await KnowledgeBase.update(updateData, {
            where: { id }
        });

        if (!updated) {
            return res.status(404).json({ status: 'fail', message: 'KnowledgeBase not found' });
        }

        const updatedKnowledge = await KnowledgeBase.findByPk(id);

        res.status(200).json({
            status: 'success',
            data: {
                knowledge: updatedKnowledge
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}