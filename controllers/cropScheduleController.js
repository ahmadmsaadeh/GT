const CropSchedule = require('../models/CropSchedule');

exports.getAllCropSchedules = async(req, res) => {
    try {
        const cropSchedules = await CropSchedule.findAll();
        res.json(cropSchedules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCropSchedule = async(req, res) => {
    try {
        const cropSchedule = await CropSchedule.create(req.body);
        res.status(201).json(cropSchedule);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCropScheduleById = async(req, res) => {
    try {
        const cropSchedule = await CropSchedule.findByPk(req.params.id);
        if (cropSchedule) {
            res.json(cropSchedule);
        } else {
            res.status(404).json({ error: 'CropSchedule not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCropSchedule = async(req, res) => {
    try {
        const cropSchedule = await CropSchedule.findByPk(req.params.id);
        if (cropSchedule) {
            await cropSchedule.update(req.body);
            res.json(cropSchedule);
        } else {
            res.status(404).json({ error: 'CropSchedule not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCropSchedule = async(req, res) => {
    try {
        const cropSchedule = await CropSchedule.findByPk(req.params.id);
        if (cropSchedule) {
            await cropSchedule.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'CropSchedule not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};