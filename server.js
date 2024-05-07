const express = require('express');
const mysql2 = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'June1520191',
    database: 'db'
},
  console.log('connected to db')
);




// Import the connection object

const Departments = require('./models/Departments')



// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
