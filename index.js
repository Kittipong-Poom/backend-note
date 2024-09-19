const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // To parse JSON body
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

setTimeout(() => {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return; 
    }
    console.log('Connected to MySQL');
  });
}, 5000); // หน่วงเวลา 5 วินาที

// Login route (no JWT, just plain text password comparison)
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  db.query('SELECT * FROM users WHERE user = ?', [user], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const userRecord = results[0];

    // Compare password (mockup, no hashing)
    if (password === userRecord.password) {
      // Just return a success message
      res.json({ message: 'Login successful', userId: userRecord.id });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
