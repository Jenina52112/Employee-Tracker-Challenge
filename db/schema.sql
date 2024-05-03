DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;
USE library_db;

CREATE TABLE department_list (
    Department_Id INT auto_increment PRIMARY KEY,
    Department VARCHAR (30) NOT NULL,
);

CREATE TABLE roles (
    Job_title VARCHAR (30) NOT NULL,
    Role_Id INT auto_increment PRIMARY KEY,
    Department VARCHAR (30) NOT NULL,
    Salary INT NOT NULL,
);

CREATE TABLE employees (
    Employee_Id INT NOT NULL,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Job_title VARCHAR(30) NOT NULL,
    Employee_dept VARCHAR(30) NOT NULL,
    Manager_name VARCHAR(30) NOT NULL,
    Salary INT,
    FOREIGN KEY (Job_title) REFERENCES roles(Job_title)
);



