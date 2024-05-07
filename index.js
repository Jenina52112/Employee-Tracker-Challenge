const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'June152019!',
  database: 'db'
});

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
          'Add an employee',
          'Update an employee role',
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
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end(); // Close the database connection
          return;
      }
    });
}

// Function to view all departments
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
        queAns = [answer.roleName, answer.roleDept, answer.roleSalary];
        connection.query('INSERT INTO roles (Job_title, Department, Salary) VALUES (queAns[0], queAns[1], queAns[2])', [answer.roleName, answer.roleDept, answer.roleSalary], (err, results) => {
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

// Similar functions for viewRoles(), viewEmployees(), addDepartment(), addRole(), addEmployee(), updateEmployeeRole()

// Call startApp to start the application
