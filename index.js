const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    viewEmployeeData();

});

function viewEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ['View all departments',
                'View all roles',
                'View all employees', ' Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
            name: "view"
        }

    ]).then((answer) => {
        switch (answer.view) {
            case 'View all depatments': {
                viewAllDepartments();
                break;
            }
            case 'View all roles': {
                viewAllRoles();
                break;
            }
            case 'View all employees': {
                viewAllEmployees();
                break;
            }
            case 'Add a department': {
                addDepartment();
                break;
            }
            case 'Add a role': {
                addRole();
                break;
            }
            case 'Add an employee': {
                addEmployee();
                break;
            }
            case 'Update as employee role': {
                updateEmployee();
                break;
            }
            case 'Exit': {
                endConnection();
                break;
            }
        }

    })
};

const viewAllDepartments = () => {
    let sql = `SELECT * FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Departments', res)
        viewEmployeeData();
    });
};




