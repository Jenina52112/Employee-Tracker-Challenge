
--adding values for department table
INSERT INTO department_list (Department)
VALUES ("Receiving"),
    ("Inventory"),
    ("Shipping"),
    ("Picking"),
    ("Packing"),
    ("Replenishment");

--adding datas for roles table
INSERT INTO roles (Job_title, Department, Salary)
VALUES ('Receiver', 'Receiving', 47000),
        ('Inventory Associate', 'Inventory', 45000),
        ('Dock Associate', 'Shipping', 50000),
        ('Order Picker', 'Picking', 55000),
        ('Packer', 'Packing', 40000),
        ('Putaway Associate', 'Replenishment', 48000),
        ('Am Supervisor', 'Receiving', 70000),
        ('Pm Supervisor', 'Shipping', 75000);

--adding employee information in employees table
INSERT INTO employees (Employee_Id, First_Name, Last_Name, Job_title, Manager_name)
VALUES (701, 'Jasmin', 'Gonzalez', 'Packer', 'JGALVAN'),
        (702, 'Medel', 'Cruz', 'Am Supervisor', 'Juan'),
        (703, 'Dominga', 'Menor', 'Inventory Associate', 'Patricia'),
        (704, 'Lilyden', 'Laureta', 'Order Picker', 'Sumi'),
        (705, 'Jessie', 'dela Cruz', 'Dock Associate', 'Desiree'),
        (706, 'Joel', 'Flores', 'Pm Supervisor', 'Juan');

--this will autofill the salary of employees based on job title
UPDATE employees
INNER JOIN roles ON employees.Job_title = roles.Job_title
SET employees.Salary = roles.Salary;

--this will autofill the department column of employees based on job title
UPDATE employees
INNER JOIN roles ON employees.Job_title = roles.Job_title
SET employees.Department = roles.Department;

