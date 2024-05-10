const inquirer = require('inquirer');
const {mysql, connection} = require('../config/connection');

//function to view department list
function viewDepartments(startAppCallback) {
  connection.query('SELECT * FROM department_list', (err, results) => {
    if (err) {
        console.error('Error fetching departments:', err);
        return;
    }
    console.table(results);
    startAppCallback(); // Call the callback function passed from index.js
  });
};

//function to view roles
function viewRoles(startAppCallback) {
  // Perform SQL query to retrieve department data
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return;
    }
    console.table(results);
    startAppCallback(); // Go back to the main menu
  });
};
  

//function to view employees
function viewEmployees(startAppCallback) {
  // Perform SQL query to retrieve department data
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return;
    }
    console.table(results);
    startAppCallback(); // Go back to the main menu
  });
};

module.exports = { viewDepartments, viewRoles, viewEmployees }