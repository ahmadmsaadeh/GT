const { where } = require('sequelize');
const LocalPartnership = require('../models/LocalPartnership');


exports.getAllLocalPartnership = async (req, res) => {
    try {
        const Partnerships = await LocalPartnership.findAll();
        res.status(200).json({
            status: 'success',
            results: Partnerships.length,
            data: {
                Partnerships
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }

};

exports.getPartnershipById = async (req, res) => {
    try {
        const {id} = req.body;
        const Partnership = await LocalPartnership.findByPk(id);
        res.status(200).json({
            status: 'success',
            data: {
                Partnership
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.addPartnership = async (req, res) => {
    try {
        const {name, type, contact } = req.body;
        const Partnership = await LocalPartnership.create({name, type, contact});
        
        return res.status(200).json({
            status: 'success',
            data: {
                Partnership
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

exports.DeletePartnership = async (req, res) => {
    try {
        const { id } = req.body;
        const Partnership = await LocalPartnership.destroy({where: {id}});
        if (!Partnership) {
            return res.status(404).json({ status: 'fail', message: 'Partnership not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Partnership deleted successfully'
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.UpdatePartnership = async (req, res) => {
    try {
        const { id } = req.body;

        const updateData = {};
        if (req.body.name !== undefined) {
            updateData.name = req.body.name;
        }
        if (req.body.type !== undefined) {
            updateData.type = req.body.type;
        }
        if (req.body.contact !== undefined) {
            updateData.contact = req.body.contact;
        }

        const [updated] = await LocalPartnership.update(updateData, {
            where: { id }
        });

        if (!updated) {
            return res.status(404).json({ status: 'fail', message: 'Partnership not found' });
        }

        const updatedPartnership = await LocalPartnership.findByPk(id);

        res.status(200).json({
            status: 'success',
            data: {
                knowledge: updatedPartnership
            }
        });
    } catch (error) {
        //console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}