const mysql = require('mysql2');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'changeme',
  database: 'db'
});

// Connect to the database

module.exports = { connection }