/*const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const sequelize = require('../database');

// Get all crops
router.get('/GardenMembership', (req, res) => {
    db.query('SELECT * FROM gardenmemberships', (err, results) => {
        if (err) {
            console.error('Error fetching gardenmemberships:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});
router.delete('/gardenmemberships/:username', (req, res) => {
    const name=req.params.username
    const query = 'DELETE userroles WHERE username =?';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            res.status(500).send('Server error');
            return;
        }
       
        res.status(200).send(`gardenmemberships Delete with name: ${name}`);
    });
});
router.get('/gardenmemberships/:id', (req, res) => {
    const id=req.params.id
    let name;
    db.query('SELECT * FROM gardenmemberships WHERE id =?',[id], (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send(`gardenmemberships  `);

    })
    
    
});

router.put('/gardenmembershipsupdate/:id', (req, res) => {
    const userId = req.params.id;
    const {  ID } = req.body;
    
    const query = 'UPDATE gardenmemberships SET  garden_id=? WHERE id = ?';
    
    db.query(query, [ ID, userId], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Server error');
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send(` garden_id  not found`);
        } else {
            res.status(200).send(`garden_id  updated successfully`);
        }
    });
});

router.put('/gardenmembershipsupdateuser/:id', (req, res) => {
    const userId = req.params.id;
    const {  ID } = req.body;
    
    const query = 'UPDATE gardenmemberships SET user_id=? WHERE id = ?';
    
    db.query(query, [ ID, userId], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Server error');
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).send(` user_id not found`);
        } else {
            res.status(200).send(`user_id  updated successfully`);
        }
    });
});

module.exports = router;*/
const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const sequelize = require('../database');

router.use(bodyParser.json());

// Get all garden memberships
router.get('/', async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching garden memberships:', error);
        res.status(500).send('Server error');
    }
});
// Get a garden membership by ID
router.get('/:id', async (req, res) => {
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
});
router.get('/user_id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships WHERE user_id = ?', {
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
});
router.get('/garden_id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM gardenmemberships WHERE garden_id = ?', {
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
});



// Delete a garden membership by username
router.delete('/user_id/:user_id/garden_id/:garden_id', async (req, res) => {
    const { user_id,garden_id } = req.params;
    try {
        await sequelize.query('DELETE FROM gardenmemberships WHERE user_id = ? AND garden_id=?', {
            replacements: [user_id,garden_id]
        });
        res.status(200).send(`Garden membership deleted with user_id: ${user_id}  garden_id: ${garden_id}`);
    } catch (error) {
        console.error('Error deleting garden membership:', error);
        res.status(500).send('Server error');
    }
});



// Update a garden membership's garden_id by ID
router.put('/garden_id/:id', async (req, res) => {
    const { id } = req.params;
    const { garden_id } = req.body;
    try {
        const [affectedRows, metadata] = await sequelize.query('UPDATE gardenmemberships SET garden_id = ? WHERE id = ?', {
            replacements: [garden_id, id]
        });
        
            res.status(200).send(`Garden membership updated successfully`);
        
    } catch (error) {
        console.error('Error updating garden membership:', error);
        res.status(500).send('Server error');
    }
});
router.put('/user_id/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const [affectedRows, metadata] = await sequelize.query('UPDATE gardenmemberships SET user_id = ? WHERE id = ?', {
            replacements: [user_id, id]
        });
        
            res.status(200).send(`Garden membership updated successfully`);
        
    } catch (error) {
        console.error('Error updating garden membership:', error);
        res.status(500).send('Server error');
    }
});
// Update a garden membership's user_id by ID

router.post('/', async (req, res) => {
    const { user_id, garden_id } = req.body;

    try {
        // Check if user_id exists in users table
        const [results, metadata] = await sequelize.query('SELECT * FROM users WHERE id =?', {
            replacements: [user_id]
        });
        if (!results) {
            return res.status(400).json({ error: 'Invalid user_id' });
        }

        // Check if garden_id exists in gardens table
        const [results1, metadata1] = await sequelize.query('SELECT * FROM gardens WHERE id =?', {
            replacements: [garden_id]
        });
        if (!results1) {
            return res.status(400).json({ error: 'Invalid garden_id' });
        }

        // Insert garden membership
        await sequelize.query('INSERT INTO gardenmemberships (user_id, garden_id) VALUES (?, ?)', {
            replacements: [user_id, garden_id],
            type: sequelize.QueryTypes.INSERT
        });

        res.status(201).send('Garden membership inserted successfully');
    } catch (error) {
        console.error('Error updating garden membership:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
