const inquirer = require('inquirer');
const { connection } = require('../config/connection');

//function for adding a department
function addDepartment(startAppCallback) {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:'
    })
    .then(answer => {
      connection.query('INSERT INTO department_list (Department) VALUES (?)', [answer.departmentName], (err, results) => {
        if (err) {
          console.error('Error adding department:', err);
          return;
        }
        console.log('Department added successfully!');
        startAppCallback(); // Go back to the main menu
      });
    });
};

//function for adding a role
function addRole(startAppCallback) {
inquirer
  .prompt([
    {
    type: 'input',
    name: 'roleName',
    message: 'Enter the name of the role:'
  },
  {
    type: 'input',
    name: 'roleDept',
    message: 'Enter the Department:'
  },
  {
    type: 'input',
    name: 'roleSalary',
    message: 'Enter the salary for the role:'
  }
])
  .then(answer => {
    connection.query('INSERT INTO roles (Job_title, Department, Salary) VALUES (?, ?, ?)', [answer.roleName, answer.roleDept, answer.roleSalary], (err, results) => {
      if (err) {
        console.error('Error adding role:', err);
        return;
      }
      console.log(answer)
      console.log('Role added successfully!');

      startAppCallback(); // Go back to the main menu
    });
  });
};


//function for adding employee
function addEmployee(startAppCallback) {
    inquirer
      .prompt([
        {
        type: 'input',
        name: 'employeefName',
        message: 'Enter the first name of the employee:'
      },
      {
        type: 'input',
        name: 'employeelName',
        message: 'Enter the last name of the employee:'
      },
      {
        type: 'input',
        name: 'employeeRole',
        message: 'Enter the role of the employee:'
      },
      {
        type: 'input',
        name: 'employeeMgr',
        message: 'Enter manager of the employee:'
      }
    ])
      .then(answer => {
      // Retrieve department and salary based on the role from the roles table
      connection.query(
        'SELECT Department, Salary FROM roles WHERE Job_title = ?',
        [answer.employeeRole],
        (err, roleResults) => {
          if (err) {
            console.error('Error retrieving role information:', err);
            return;
          }
          // Extract department and salary from roleResults
          const department = roleResults[0]?.Department;
          const salary = roleResults[0]?.Salary;
          // Insert employee into employees table
          connection.query(
            'INSERT INTO employees (First_Name, Last_Name, Job_title, Manager_name, Department, Salary) VALUES (?, ?, ?, ?, ?, ?)',
            [answer.employeefName, answer.employeelName, answer.employeeRole, answer.employeeMgr, department, salary],
            (err, results) => {
              if (err) {
                console.error('Error adding employee:', err);
                return;
              }
              console.log(answer);
              console.log('Employee added successfully!');
              startAppCallback(); // Go back to the main menu
            }
          );
        }
      );
    });
};
    
module.exports = { addDepartment, addRole, addEmployee }
  