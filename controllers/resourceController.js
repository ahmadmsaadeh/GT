const Resource = require('../models/Resource');

exports.getAllResources = async(req, res) => {
    try {
        const resources =  await Resource.findAll();
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
        console.log(`id is ${id}`);
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

exports.addNewResource = async (req, res) => {
    try {
        const { name, type, quantity, available_from } = req.body;
        const newResource = await Resource.create({
            name,
            type,
            quantity,
            available_from
        });

        res.status(201).json({ 
            message: 'Resource added successfully.', 
            resource: newResource 
        });
    } catch (error) {
        console.error("Error adding new resource:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteResource = async (req,res) => {
    try{
        const id = req.params.id;
        console.log(`id is ${id}`);
        const resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource not found'
            });
        }

        await resource.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Resource deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).send("Internal Server Error");
    }
}

exports.updateResourceByID = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, type, quantity, available_from } = req.body;

        const resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource not found'
            });
        }

        await resource.update({
            name: name || resource.name,
            type: type || resource.type,
            quantity: quantity || resource.quantity,
            available_from: available_from || resource.available_from
        });

        res.status(200).json({
            status: 'success',
            message: 'Resource updated successfully',
            data: {
                resource
            }
        });
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).send("Internal Server Error");
    }
};