const inquirer = require('inquirer');
const { connection } = require('../config/connection');

//filter employees by manager name
function viewEmployeesByManager(startAppCallback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'Enter the name of the manager to view their employees:'
      }
    ])
    .then(managerAnswer => {
      connection.query(
        'SELECT * FROM employees WHERE Manager_name = ?',
        [managerAnswer.managerName],
        (err, results) => {
          if (err) {
            console.error('Error retrieving employees by manager:', err);
            return;
          }

          if (results.length === 0) {
            console.log('No employees found for the specified manager.');
          } else {
            console.log('Employees:');
            results.forEach(employee => {
              console.log(`${employee.First_Name} ${employee.Last_Name} (${employee.Job_title})`);
            });
          }

          startAppCallback(); // Go back to the main menu
        }
      );
    });
};


//filter employees by department
function viewEmployeesByDepartment(startAppCallback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department to view its employees:'
      }
    ])
    .then(departmentAnswer => {
      connection.query(
        'SELECT * FROM employees WHERE Department = ?',
        [departmentAnswer.departmentName],
        (err, results) => {
          if (err) {
            console.error('Error retrieving employees by department:', err);
            return;
          }

          if (results.length === 0) {
            console.log('No employees found for the specified department.');
          } else {
            console.log('Employees:');
            results.forEach(employee => {
              console.log(`${employee.First_Name} ${employee.Last_Name} (${employee.Job_title})`);
            });
          }

          startAppCallback(); // Go back to the main menu
        }
      );
    });
};

//sum up all salaries by department
function viewBudgetByDepartment(startAppCallback) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department to view the combined salaries:'
      }
    ])
    .then(departmentAnswer => {
      connection.query(
        'SELECT SUM(Salary) AS combinedSalaries FROM employees WHERE Department = ?',
        [departmentAnswer.departmentName],
        (err, results) => {
          if (err) {
            console.error('Error retrieving combined salaries by department:', err);
            return;
          }

          if (results.length === 0 || results[0].combinedSalaries === null) {
            console.log('No employees found for the specified department.');
          } else {
            console.log(`Combined salaries for department ${departmentAnswer.departmentName}: $${results[0].combinedSalaries}`);
          }

          startAppCallback(); // Go back to the main menu
        }
      );
    });
}


module.exports = { viewEmployeesByManager, viewEmployeesByDepartment, viewBudgetByDepartment }