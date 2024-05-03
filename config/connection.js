const Sequelize = require('sequelize');
require('dotenv').config();
const mysql2 = require('mysql2');


// Create a connection object
const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USER,
 process.env.DB_PASSWORD,
  {
    // Database location
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = {sequelize, mysql2};
