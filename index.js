const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    menu();

});

function menu() {
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
        console.log("Answer is ", answer)
        switch (answer.view) {
            case 'View all departments': {
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
    let sql = `SELECT * FROM departments ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Departments', res)
        menu();
    });
};
const viewAllRoles = () => {
    let sql = `SELECT * FROM roles ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Roles', res)
        menu();
    });
};
const viewAllEmployees = () => {
    let sql = `SELECT * FROM employees ORDER BY id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Employees', res)
        menu();
    });
};

// const addDepartment = async () => {

//     let answer = await inquirer.prompt([
//         {
//             type: "input",
//             message: "Name of the Department you would like to add!",
//             name: "name"
//         }
//     ]);
//     let result = await db.query("INSERT INTO departments SET ?", {
//         name: answer.name
//     });
//     console.table(result)
//     menu();
// }





