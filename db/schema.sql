DROP DATABASE IF EXISTS db;
CREATE DATABASE db;
USE db;


CREATE TABLE department_list (
    Department_Id INT auto_increment,
    Department VARCHAR (30) NOT NULL,
    PRIMARY KEY (Department_Id)
);




CREATE TABLE roles (
    Job_title VARCHAR (30) NOT NULL,
    Role_Id INT auto_increment,
    Department VARCHAR (30) NOT NULL,
    Salary INT NOT NULL,
    PRIMARY KEY (Role_Id)
);

CREATE TABLE employees (
    Employee_Id INT NOT NULL,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Job_title VARCHAR(30) NOT NULL,
    Department VARCHAR(30),
    Manager_name VARCHAR(30) NOT NULL,
    Salary INT
    
);



-- UPDATE table1
-- INNER JOIN table2 ON table1.id = table2.id
-- SET table1.Price = table2.price;



