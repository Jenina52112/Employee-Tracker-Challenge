const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Departments extends Model {}

Departments.init(
{
    Department: {
        type: DataTypes.STRING
    }

},
{
    sequelize,
    modelName: 'departmentList'
}
);
module.exports = Departments