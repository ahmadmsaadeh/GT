const Resource = require('../models/Resource');

exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.status(200).json({
            status: 'success',
            results: resources.length,
            data: {
                resources
            }
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getResourceByID = async (req, res) => {
    try {
        const id = req.params.id;
        const resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                resource
            }
        });
    } catch (error) {
        console.error("Error fetching resource:", error);
        res.status(500).send("Internal Server Error");
    }
};
