DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    depatment_name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER
 );
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);
