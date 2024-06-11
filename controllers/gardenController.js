const Garden = require('../models/Garden');

exports.getAllGardens = async(req, res) => {
    try {
        const gardens = await Garden.findAll();
        res.json(gardens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createGarden = async(req, res) => {
    try {
        const garden = await Garden.create(req.body);
        res.status(201).json(garden);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGardenById = async(req, res) => {
    try {
        const garden = await Garden.findByPk(req.params.id);
        if (garden) {
            res.json(garden);
        } else {
            res.status(404).json({ error: 'Garden not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateGarden = async(req, res) => {
    try {
        const garden = await Garden.findByPk(req.params.id);
        if (garden) {
            await garden.update(req.body);
            res.json(garden);
        } else {
            res.status(404).json({ error: 'Garden not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteGarden = async(req, res) => {
    try {
        const garden = await Garden.findByPk(req.params.id);
        if (garden) {
            await garden.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Garden not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};