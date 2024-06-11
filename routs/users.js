const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../database');
const User = require('../models/User'); // Adjust the path if necessary
const bodyParser = require('body-parser');
const saltRounds = 10;
const router = Router();
// Login route using raw SQL query
// Login route using raw SQL query
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Find user by username using raw SQL query
      const [users, metadata] = await sequelize.query('SELECT * FROM users WHERE username = ?', {
          replacements: [username],
          type: sequelize.QueryTypes.SELECT
      });


      // If user not found, return error
      if (!users || users.length === 0) {
          return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      const user = users;


      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
          // If password matches, generate JWT token
          const token = jwt.sign(
              { 
                  ID: user.ID,
                  username: user.username,
                  email: user.email
              },
              'your_secret_key',
              { expiresIn: '1h' }
          );

          res.json({
              success: true,
              message: 'Login successful',
              token,
              username: user.username,
              email: user.email
          });
      } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred, please try again later' });
  }
});


// Signup route using raw SQL query
router.post('/signup', async (req, res) => {
    const { username, email, password, role_name, description } = req.body;
console.log(req.body)
    try {
        // Check if username or email already exists
        const [existingUsers, metadata] = await sequelize.query('SELECT * FROM users WHERE username = ? OR email = ?', {
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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user record using raw SQL query
        await sequelize.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', {
            replacements: [username, email, hashedPassword],
            type: sequelize.QueryTypes.INSERT
        });

        // Create user role record using raw SQL query
        await sequelize.query('INSERT INTO userroles (username, role_name, description) VALUES (?, ?, ?)', {
            replacements: [username, role_name, description],
            type: sequelize.QueryTypes.INSERT
        });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'An error occurred, please try again later' });
    }
});
router.get('/', async (req, res) => {
    console.log("Fetching user roles");
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM users');
        res.json(results);
    } catch (err) {
        console.error('Error fetching user :', err);
        res.status(500).send('Server error');
    }
});
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    console.log("Fetching user roles");
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM users WHERE username =?', {
            replacements: [username]
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching user :', err);
        res.status(500).send('Server error');
    }
});
module.exports = router;
