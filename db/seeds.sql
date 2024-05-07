INSERT INTO department_list (Department)
VALUES ("Receiving"),
    ("Inventory"),
    ("Shipping"),
    ("Picking"),
    ("Packing"),
    ("Replenishment");

INSERT INTO roles (Job_title, Department, Salary)
VALUES ('Receiver', 'Receiving', 47000),
        ('Inventory Associate', 'Inventory', 45000),
        ('Dock Associate', 'Shipping', 50000),
        ('Order Picker', 'Picking', 55000),
        ('Packer', 'Packing', 40000),
        ('Putaway Associate', 'Replenishment', 48000),
        ('Am Supervisor', 'Receiving', 70000),
        ('Pm Supervisor', 'Shipping', 75000);

INSERT INTO employees (Employee_Id, First_Name, Last_Name, Job_title, Manager_name)
VALUES (701, 'Jasmin', 'Gonzalez', 'Packer', 'JGALVAN'),
        (702, 'Medel', 'Cruz', 'Am Supervisor', 'Juan'),
        (703, 'Dominga', 'Menor', 'Inventory Associate', 'Patricia'),
        (704, 'Lilyden', 'Laureta', 'Order Picker', 'Sumi'),
        (705, 'Jessie', 'dela Cruz', 'Dock Associate', 'Desiree'),
        (706, 'Joel', 'Flores', 'Pm Supervisor', 'Juan');


UPDATE employees
INNER JOIN roles ON employees.Job_title = roles.Job_title
SET employees.Salary = roles.Salary;

UPDATE employees
INNER JOIN roles ON employees.Job_title = roles.Job_title
SET employees.Department = roles.Department;



-- CREATE TABLE employees (
--     Employee_Id INT auto_increment PRIMARY KEY,
--     First_Name VARCHAR(30) NOT NULL,
--     Last_Name VARCHAR(30) NOT NULL,
--     Job_title VARCHAR(30) NOT NULL,
--     Employee_dept VARCHAR(30) NOT NULL,
--     Employee_salary INT NOT NULL,
--     Manager_name VARCHAR(30) NOT NULL


-- )