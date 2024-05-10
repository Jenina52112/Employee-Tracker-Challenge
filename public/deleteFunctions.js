const inquirer = require('inquirer');
const {mysql, connection} = require('../config/connection');


  function deleteRole(startAppCallback) {
    // Query the database to get a list of roles for the user to choose from
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) {
        console.error('Error fetching roles:', err);
        return;
      }
      inquirer
        .prompt({
          type: 'list',
          name: 'role',
          message: 'Select the role to delete:',
          choices: roles.map(role => ({
            name: role.Job_title,
            value: role.Role_Id
          }))
        })
        .then(answer => {
          // Execute a SQL DELETE statement to remove the selected role
          connection.query('DELETE FROM roles WHERE Role_Id = ?', [answer.role], (err, results) => {
            if (err) {
              console.error('Error deleting role:', err);
              return;
            }
            console.log('Role deleted successfully!');
            startAppCallback(); // Go back to the main menu
          });
        });
    });
  };

  function deleteEmployee(startAppCallback) {
        // Query the database to get a list of roles for the user to choose from
        connection.query('SELECT * FROM employees', (err, employees) => {
          if (err) {
            console.error('Error fetching employees:', err);
            return;
          }
          inquirer
            .prompt({
              type: 'list',
              name: 'employee',
              message: 'Select the employee to delete:',
              choices: employees.map(employee => ({
                name: employee.First_Name + ' ' + employee.Last_Name,
                value: employee.Last_Name
              }))
            })
            .then(answer => {
              // Execute a SQL DELETE statement to remove the selected role
              connection.query('DELETE FROM employees WHERE Last_Name = ?', [answer.employee], (err, results) => {
                if (err) {
                  console.error('Error deleting employee:', err);
                  return;
                }
                console.log('Employee deleted successfully!');
                startAppCallback(); // Go back to the main menu
              });
            });
        });
      }
      
  
  function deleteDept(startAppCallback) {
    // Query the database to get a list of roles for the user to choose from
    connection.query('SELECT * FROM department_list', (err, department_list) => {
      if (err) {
        console.error('Error fetching departments:', err);
        return;
      }
      inquirer
        .prompt({
          type: 'list',
          name: 'dept',
          message: 'Select the department to delete:',
          choices: department_list.map(dept => ({
            name: dept.Department,
            value: dept.Department
          }))
        })
        .then(answer => {
          // Execute a SQL DELETE statement to remove the selected dept
          connection.query('DELETE FROM department_list WHERE Department = ?', [answer.dept], (err, results) => {
            if (err) {
              console.error('Error deleting dept:', err);
              return;
            }
            console.log('Dept deleted successfully!');
            startAppCallback(); // Go back to the main menu
          });
        });
    });
  }


  module.exports = { deleteRole, deleteEmployee, deleteDept }
