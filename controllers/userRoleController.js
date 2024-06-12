const sequelize = require('../database');

exports.getAllUserRoles = async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM userroles');
        res.json(results);
    } catch (err) {
        console.error('Error fetching user roles:', err);
        res.status(500).send('Server error');
    }
};

exports.getUserRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await sequelize.query('SELECT * FROM userroles WHERE id = ?', { replacements: [id] });
        res.json(results);
    } catch (err) {
        console.error('Error fetching user role:', err);
        res.status(500).send('Server error');
    }
};

exports.deleteUserRoleByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const query = 'DELETE FROM userroles WHERE username = ?';
        const [result] = await sequelize.query(query, { replacements: [username] });
        const deleteRelatedUsersQuery = 'DELETE FROM users WHERE username = ?';
        await sequelize.query(deleteRelatedUsersQuery, { replacements: [username] });
        res.status(200).send(`User role with username ${username} deleted successfully`);
    } catch (err) {
        console.error('Error deleting user role:', err);
        res.status(500).send('Server error');
    }
};

exports.deleteUserRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const selectQuery = 'SELECT username FROM userroles WHERE id = ?';
        const [results] = await sequelize.query(selectQuery, { replacements: [id] });
        if (results.length > 0) {
            const username = results[0].username;
            const deleteQuery = 'DELETE FROM userroles WHERE id = ?';
            await sequelize.query(deleteQuery, { replacements: [id] });
            const deleteRelatedUsersQuery = 'DELETE FROM users WHERE username = ?';
            await sequelize.query(deleteRelatedUsersQuery, { replacements: [username] });
            res.status(200).send(`User role with ID ${id} and related users deleted successfully`);
        } else {
            res.status(404).send(`User role with ID ${id} not found`);
        }
    } catch (err) {
        console.error('Error deleting user role:', err);
        res.status(500).send('Server error');
    }
};

exports.updateUserRoleById = async (req, res) => {
    const { id } = req.params;
    const { role_name, description } = req.body;
    try {
        const query = 'UPDATE userroles SET role_name = ?, description = ? WHERE id = ?';
        const [result] = await sequelize.query(query, { replacements: [role_name, description, id] });
        if (result[0] === 0) {
            res.status(404).send(`User role with ID ${id} not found`);
        } else {
            res.status(200).send(`User role with ID ${id} updated successfully`);
        }
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).send('Server error');
    }
};

exports.updateUserRoleByUsername = async (req, res) => {
    const { username } = req.params;
    const { role_name, description } = req.body;
    try {
        const query = 'UPDATE userroles SET role_name = ?, description = ? WHERE username = ?';
        const [result] = await sequelize.query(query, { replacements: [role_name, description, username] });
        if (result[0] === 0) {
            res.status(404).send(`User role with username ${username} not found`);
        } else {
            res.status(200).send(`User role with username ${username} updated successfully`);
        }
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).send('Server error');
    }
};
