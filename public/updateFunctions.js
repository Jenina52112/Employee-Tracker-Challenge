const inquirer = require('inquirer');
const {mysql, connection} = require('../config/connection');


//function to update role of an employee  
function updateEmployeeRole(startAppCallback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeName',
        message: 'Enter the first and last name of the employee you want to update:'
      }
    ])
    .then(employeeAnswer => {
      // Retrieve the employee's current role
      connection.query(
        'SELECT * FROM employees WHERE CONCAT(First_Name, " ", Last_Name) = ?',
        [employeeAnswer.employeeName],
        (err, employeeResults) => {
          if (err) {
            console.error('Error retrieving employee information:', err);
            return;
          }

          if (employeeResults.length === 0) {
            console.log('Employee not found.');
            startApp();
            return;
          }

          const employee = employeeResults[0];

          // Prompt the user to select the new role for the employee
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new role for the employee:'
              }
            ])
            .then(newRoleAnswer => {
              // Retrieve the salary and department based on the new role from the roles table
              connection.query(
                'SELECT Salary, Department FROM roles WHERE Job_title = ?',
                [newRoleAnswer.newRole],
                (err, roleResults) => {
                  if (err) {
                    console.error('Error retrieving role information:', err);
                    return;
                  }

                  if (roleResults.length === 0) {
                    console.log('Role not found.');
                    startApp();
                    return;
                  }

                  const newRole = roleResults[0];

                  // Update the employee's role, salary, and department in the database
                  connection.query(
                    'UPDATE employees SET Job_title = ?, Salary = ?, Department = ? WHERE CONCAT(First_Name, " ", Last_Name) = ?',
                    [newRoleAnswer.newRole, newRole.Salary, newRole.Department, employeeAnswer.employeeName],
                    (err, updateResults) => {
                      if (err) {
                        console.error('Error updating employee role:', err);
                        return;
                      }

                      console.log('Employee role updated successfully!');
                      startAppCallback(); // Go back to the main menu
                    }
                  );
                }
              );
            });
        }
      );
    });
};


//function to update manager name of employee
function updateManagerName(startAppCallback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeName',
        message: 'Enter the name of the employee whose manager you want to update:'
      },
      {
        type: 'input',
        name: 'newManagerName',
        message: 'Enter the new name of the manager:'
      }
    ])
    .then(managerAnswer => {
      connection.query(
        'UPDATE employees SET Manager_name = ? WHERE CONCAT(First_Name, " ", Last_Name) = ?',
        [managerAnswer.newManagerName, managerAnswer.employeeName],
        (err, results) => {
          if (err) {
            console.error('Error updating manager name:', err);
            return;
          }

          console.log('Manager name updated successfully!');
          startAppCallback(); // Go back to the main menu
        }
      );
    });
};
      

module.exports = { updateEmployeeRole, updateManagerName }