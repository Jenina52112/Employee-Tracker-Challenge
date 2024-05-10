const inquirer = require('inquirer');
const { connection } = require('./config/connection');

//imported files from public folder
const { viewDepartments, viewRoles, viewEmployees } = require('./public/viewFunctions');
const { addDepartment, addRole, addEmployee } = require('./public/addFunctions');
const { deleteRole, deleteEmployee, deleteDept } = require('./public/deleteFunctions');
const { updateEmployeeRole, updateManagerName } = require('./public/updateFunctions');
const { viewEmployeesByManager, viewEmployeesByDepartment, viewBudgetByDepartment } = require('./public/filter')


// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  // Start the application
  startApp();
});

// // Function to start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Delete a Role',
          'Delete an Employee',
          'Delete a Department',
          'Update an employee role',
          'Update manager name of an employee',
          'View employees by manager',
          'View employees by Department',
          'View total utilized budget of a department',
          'Exit'
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments(startApp);
          break;
        case 'View all roles':
          viewRoles(startApp);
          break;
        case 'View all employees':
          viewEmployees(startApp);
          break;
        case 'Add a department':
          addDepartment(startApp);
          break;
        case 'Add a role':
          addRole(startApp);
          break;
        case 'Add an employee':
          addEmployee(startApp);
          break;
        case 'Delete a Role':
          deleteRole(startApp);
          break;
        case 'Delete an Employee':
          deleteEmployee(startApp);
          break;
        case 'Delete a Department':
          deleteDept(startApp);
          break;
        case 'Update an employee role':
          updateEmployeeRole(startApp);
          break;
        case 'Update manager name of an employee':
          updateManagerName(startApp);
          break;
        case 'View employees by manager':
          viewEmployeesByManager(startApp);
          break;
        case 'View employees by Department':
          viewEmployeesByDepartment(startApp);
          break;
        case 'View total utilized budget of a department':
          viewBudgetByDepartment(startApp);
          break;
        case 'Exit':
          connection.end(); // Close the database connection
          return;
      }
    });
};












