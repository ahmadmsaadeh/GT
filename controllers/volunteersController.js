const Volunteer = require('../models/Volunteer');

exports.getAllVolunteers = async(req, res) => {
    try {
        const volunteers =  await Volunteer.findAll();
        res.status(200).json({
            status: 'success',
            results: volunteers.length,
            data: {
                volunteers
            }
        });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getVolunteerByID = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`id is ${id}`);
        const volunteer = await Volunteer.findByPk(id);
        if (!volunteer) {
            return res.status(404).json({
                status: 'fail',
                message: 'Volunteer not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                volunteer
            }
        });
    } catch (error) {
        console.error("Error fetching volunteer:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.addNewVolunteer = async (req, res) => {
    try {
        const { name, contact, role } = req.body;
        const newVolunteer = await Volunteer.create({
            name,
            contact,
            role
        });

        res.status(201).json({ 
            message: 'Volunteer added successfully.', 
            volunteer: newVolunteer
        });
    } catch (error) {
        console.error("Error adding new volunteer:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteVolunteer = async (req,res) => {
    try{
        const id = req.params.id;
        console.log(`id is ${id}`);
        const volunteer = await Volunteer.findByPk(id);
        if (!volunteer) {
            return res.status(404).json({
                status: 'fail',
                message: 'Volunteer not found'
            });
        }

        await volunteer.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Volunteer deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).send("Internal Server Error");
    }
}