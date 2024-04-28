const inquirer = require('inquirer');

// Sample employee database
let employees = [];

// Function to add a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'position',
            message: 'Enter employee position:'
        }
    ]).then(answers => {
        employees.push(answers);
        console.log('Employee added successfully!\n');
        mainMenu();
    });
}

// Function to view all employees
function viewEmployees() {
    console.log('List of Employees:');
    employees.forEach((employee, index) => {
        console.log(`${index + 1}. Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}`);
    });
    console.log('');
    mainMenu();
}

// Function to delete an employee
function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'index',
            message: 'Enter the index of the employee you want to delete:'
        }
    ]).then(answers => {
        const index = parseInt(answers.index) - 1;
        if (index >= 0 && index < employees.length) {
            employees.splice(index, 1);
            console.log('Employee deleted successfully!\n');
        } else {
            console.log('Invalid index. No employee deleted.\n');
        }
        mainMenu();
    });
}

// Main menu function
function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: ['Add Employee', 'View Employees', 'Delete Employee', 'Exit']
    }).then(answer => {
        switch (answer.option) {
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Exit':
                console.log('Exiting program.');
                break;
        }
    });
}

// Start the application
console.log('Welcome to the Employee Tracker!');
mainMenu();
