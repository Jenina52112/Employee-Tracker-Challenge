// const inquirer = require('inquirer');
// const {
//     startApp, viewRoles, viewEmployees, addDepartment, addRole, deleteRole, deleteEmployee, deleteDept,
//     addEmployee, updateEmployeeRole, updateManagerName, viewEmployeesByManager, viewEmployeesByDepartment
//     } = require('../index')
// const {mysql, connection} = require('../config/connection')

// connection.connect(err => {
//     if (err) {
//       console.error('Error connecting to database:', err);
//       return;
//     }
//     console.log('Connected to database');
//     // Start the application
//     startApp();
//   });
  
//   function viewDepartments() {
//     // Perform SQL query to retrieve department data
//     connection.query('SELECT * FROM department_list', (err, results) => {
//       if (err) {
//         console.error('Error fetching departments:', err);
//         return;
//       }
//       console.table(results);
//       startApp(); // Go back to the main menu
//     });
//   }


//   module.exports = { viewDepartments }