 const inquirer = require('inquirer');
//const { viewDepartments } = require('./Functions/views')
const { connection } = require('./config/connection')

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

// Function to start the application
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
          'Delete a Role',
          'Delete an Employee',
          'Delete a Department',
          'Add an employee',
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
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Delete a Role':
        deleteRole();
        break;
        case 'Delete an Employee':
          deleteEmployee();
          break;
        case 'Delete a Department':
          deleteDept();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Update manager name of an employee':
          updateManagerName();
          break;
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by Department':
          viewEmployeesByDepartment();
          break;
        case 'View total utilized budget of a department':
          viewBudgetByDepartment();
          break;
        case 'Exit':
          connection.end(); // Close the database connection
          return;
      }
    });
}

//Function to view all departments
function viewDepartments() {
  // Perform SQL query to retrieve department data
  connection.query('SELECT * FROM department_list', (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return;
    }
    console.table(results);
    startApp(); // Go back to the main menu
  });
}

function viewRoles() {
    // Perform SQL query to retrieve department data
    connection.query('SELECT * FROM roles', (err, results) => {
      if (err) {
        console.error('Error fetching roles:', err);
        return;
      }
      console.table(results);
      startApp(); // Go back to the main menu
    });
  }

  function viewEmployees() {
    // Perform SQL query to retrieve department data
    connection.query('SELECT * FROM employees', (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return;
      }
      console.table(results);
      startApp(); // Go back to the main menu
    });
  }

  function addDepartment() {
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
          startApp(); // Go back to the main menu
        });
      });
  }
  
  function addRole() {
    inquirer
      .prompt(
        [
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
    ]
    )
      .then(answer => {
        connection.query('INSERT INTO roles (Job_title, Department, Salary) VALUES (?, ?, ?)', [answer.roleName, answer.roleDept, answer.roleSalary], (err, results) => {
          if (err) {
            console.error('Error adding role:', err);
            return;
          }
          console.log(answer)
          console.log('Role added successfully!');

          startApp(); // Go back to the main menu
        });
      });
  }

  function addEmployee() {
    inquirer
      .prompt(
        [
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
    ]
    )
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
              startApp(); // Go back to the main menu
            }
          );
        }
      );
    });
}

function updateEmployeeRole() {
  // Prompt the user to select an employee to update
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
                      startApp(); // Go back to the main menu
                    }
                  );
                }
              );
            });
        }
      );
    });
}




  function deleteRole() {
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
            startApp(); // Go back to the main menu
          });
        });
    });
  }

  function deleteDept() {
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
            startApp(); // Go back to the main menu
          });
        });
    });
  }


  function deleteEmployee() {
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
            name: employee.First_Name + employee.Last_Name,
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
            startApp(); // Go back to the main menu
          });
        });
    });
  }
  
  function viewEmployeesByManager() {
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
  
            startApp(); // Go back to the main menu
          }
        );
      });
  };



  function viewEmployeesByDepartment() {
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
  
            startApp(); // Go back to the main menu
          }
        );
      });
  }
  
  function updateManagerName() {
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
            startApp(); // Go back to the main menu
          }
        );
      });
  }
  
  function viewBudgetByDepartment() {
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
  
            startApp(); // Go back to the main menu
          }
        );
      });
  }
  
  module.exports = { 
    startApp, viewRoles, viewDepartments, viewEmployees, addDepartment, addRole, deleteRole, deleteEmployee, deleteDept,
    addEmployee, updateEmployeeRole, updateManagerName, viewEmployeesByManager, viewEmployeesByDepartment
   }