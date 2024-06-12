const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');

const saltRounds = 10;

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await sequelize.query('SELECT * FROM users WHERE username = ?', {
            replacements: [username],
            type: sequelize.QueryTypes.SELECT
        });

        if (!users || users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = users;
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign(
                { ID: user.ID, username: user.username, email: user.email },
                'your_secret_key',
                { expiresIn: '1h' }
            );

            res.json({ success: true, message: 'Login successful', token, username: user.username, email: user.email });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred, please try again later' });
    }
};

exports.signup = async (req, res) => {
    const { username, email, password, role_name, description } = req.body;

    try {
        const [existingUsers] = await sequelize.query('SELECT * FROM users WHERE username = ? OR email = ?', {
            replacements: [username, email],
            type: sequelize.QueryTypes.SELECT
        });

        if (existingUsers && existingUsers.length > 0) {
            const existingUser = existingUsers.find(user => user.username === username || user.email === email);
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            } else {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await sequelize.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', {
            replacements: [username, email, hashedPassword],
            type: sequelize.QueryTypes.INSERT
        });

        await sequelize.query('INSERT INTO userroles (username, role_name, description) VALUES (?, ?, ?)', {
            replacements: [username, role_name, description],
            type: sequelize.QueryTypes.INSERT
        });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'An error occurred, please try again later' });
    }
};
