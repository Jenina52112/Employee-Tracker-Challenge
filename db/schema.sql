--this creates and use the database db
DROP DATABASE IF EXISTS db;
CREATE DATABASE db;
USE db;

--table for departments
CREATE TABLE department_list (
    Department_Id INT auto_increment,
    Department VARCHAR (30) NOT NULL,
    PRIMARY KEY (Department_Id)
);

--table for roles
CREATE TABLE roles (
    Job_title VARCHAR (30) NOT NULL,
    Role_Id INT auto_increment,
    Department VARCHAR (30) NOT NULL,
    Salary INT NOT NULL,
    PRIMARY KEY (Role_Id)
);

--table for employees
CREATE TABLE employees (
    Employee_Id INT NOT NULL auto_increment,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Job_title VARCHAR(30) NOT NULL,
    Department VARCHAR(30),
    Manager_name VARCHAR(30) NOT NULL,
    Salary INT,
    PRIMARY KEY (Employee_Id)    
);





