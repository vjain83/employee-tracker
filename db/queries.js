
const db = require("./connection");

exports.fetchAllDepartments = function () {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT * FROM departments ORDER BY id`;
        db.query(sql, (err, res) => {
            if (err) { reject(err); }
            else { resolve(res) }
        });
    })
}

exports.fetchAllRoles = function () {
    return new Promise(function (resolve, reject) {
        let sql = ` SELECT r.id, r.title, r.salary, d.departmentName 
        FROM roles r 
        INNER JOIN departments d ON r.department_id = d.id 
        ORDER BY r.id`;
        db.query(sql, (err, res) => {
            if (err) reject(err);
            else { resolve(res) }

        })
    })
}

exports.fetchAllEmployee = function () {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT e.id Id, e.first_name FirstName, e.last_name LastName, r.title Title, d.departmentName Department, CONCAT_WS(' ', m.first_name, m.last_name) Manager, r.salary Salary 
        FROM employees e 
        LEFT JOIN roles r ON e.role_id = r.id 
        INNER JOIN departments d ON r.department_id = d.id 
        LEFT JOIN employees m ON e.manager_id = m.id 
        ORDER BY e.id;`;
        db.query(sql, (err, res) => {
            if (err) reject(err);
            else { resolve(res) }

        })
    })
}

exports.insertNewDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO departments (departmentName) VALUES (?)`;

        db.query(sql, [department], (err, res) => {
            if (err) reject(err);
            else { resolve(res) }
        });
    })
}

exports.insertNewRole = function (role, salary, department) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

        db.query(sql, [role, salary, department], (err, res) => {
            if (err) reject(err);
            else { resolve(res) }
        });
    })
}

exports.insertNewEmployee = function (firstName, lastName, role, manager) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;

        db.query(sql, [firstName, lastName, role, manager], (err, res) => {
            if (err) reject(err);
            else { resolve(res) }
        });
    })
}

exports.updateEmployeeRole = function (employee, newRole) {
    return new Promise(function (resolve, reject) {
        const sql = `UPDATE employees SET role_id = ? where id = ?`;

        db.query(sql, [newRole, employee], (err, res) => {
            if (err) reject(err);
            else { resolve(res) }
        });
    })
}