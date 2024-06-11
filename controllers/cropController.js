const Crop = require('../models/Crop');

exports.getAllCrops = async(req, res) => {
    try {
        const crops = await Crop.findAll();
        res.json(crops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCrop = async(req, res) => {
    try {
        const crop = await Crop.create(req.body);
        res.status(201).json(crop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCropById = async(req, res) => {
    try {
        const crop = await Crop.findByPk(req.params.id);
        if (crop) {
            res.json(crop);
        } else {
            res.status(404).json({ error: 'Crop not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCrop = async(req, res) => {
    try {
        const crop = await Crop.findByPk(req.params.id);
        if (crop) {
            await crop.update(req.body);
            res.json(crop);
        } else {
            res.status(404).json({ error: 'Crop not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCrop = async(req, res) => {
    try {
        const crop = await Crop.findByPk(req.params.id);
        if (crop) {
            await crop.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Crop not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};