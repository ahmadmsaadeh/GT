const sequelize = require('../database');

exports.getAllGardenMemberships = async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching garden memberships:', error);
        res.status(500).send('Server error');
    }
};

exports.getGardenMembershipById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships WHERE id = ?', {
            replacements: [id]
        });
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).send('Garden membership not found');
        }
    } catch (error) {
        console.error('Error fetching garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.getGardenMembershipByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships WHERE user_id = ?', {
            replacements: [id]
        });
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send('Garden membership not found');
        }
    } catch (error) {
        console.error('Error fetching garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.getGardenMembershipByGardenId = async (req, res) => {
    const { id } = req.params;
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships WHERE garden_id = ?', {
            replacements: [id]
        });
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send('Garden membership not found');
        }
    } catch (error) {
        console.error('Error fetching garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.deleteGardenMembership = async (req, res) => {
    const { user_id, garden_id } = req.params;
    try {
        await sequelize.query('DELETE FROM gardenmemberships WHERE user_id = ? AND garden_id = ?', {
            replacements: [user_id, garden_id]
        });
        res.status(200).send(`Garden membership deleted with user_id: ${user_id} and garden_id: ${garden_id}`);
    } catch (error) {
        console.error('Error deleting garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.updateGardenMembershipGardenId = async (req, res) => {
    const { id } = req.params;
    const { garden_id } = req.body;
    try {
        await sequelize.query('UPDATE gardenmemberships SET garden_id = ? WHERE id = ?', {
            replacements: [garden_id, id]
        });
        res.status(200).send('Garden membership updated successfully');
    } catch (error) {
        console.error('Error updating garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.updateGardenMembershipUserId = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        await sequelize.query('UPDATE gardenmemberships SET user_id = ? WHERE id = ?', {
            replacements: [user_id, id]
        });
        res.status(200).send('Garden membership updated successfully');
    } catch (error) {
        console.error('Error updating garden membership:', error);
        res.status(500).send('Server error');
    }
};

exports.createGardenMembership = async (req, res) => {
    const { user_id, garden_id } = req.body;
    try {
        // Check if user_id exists in users table
        const [userResults, userMetadata] = await sequelize.query('SELECT * FROM users WHERE id = ?', {
            replacements: [user_id]
        });
        if (userResults.length === 0) {
            return res.status(400).json({ error: 'Invalid user_id' });
        }

        // Check if garden_id exists in gardens table
        const [gardenResults, gardenMetadata] = await sequelize.query('SELECT * FROM gardens WHERE id = ?', {
            replacements: [garden_id]
        });
        if (gardenResults.length === 0) {
            return res.status(400).json({ error: 'Invalid garden_id' });
        }

        // Insert garden membership
        await sequelize.query('INSERT INTO gardenmemberships (user_id, garden_id) VALUES (?, ?)', {
            replacements: [user_id, garden_id],
            type: sequelize.QueryTypes.INSERT
        });

        res.status(201).send('Garden membership inserted successfully');
    } catch (error) {
        console.error('Error creating garden membership:', error);
        res.status(500).send('Server error');
    }
};
