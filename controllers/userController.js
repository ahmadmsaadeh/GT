const sequelize = require('../database');

exports.getAllUsers = async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
};

exports.getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const [results] = await sequelize.query('SELECT * FROM users WHERE username = ?', {
            replacements: [username]
        });
        res.json(results);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
};
