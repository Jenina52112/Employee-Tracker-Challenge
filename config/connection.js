const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize (
    'library_db',
    'root',
    'June152019!',

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3001
    }
);
module.exports = sequelize;