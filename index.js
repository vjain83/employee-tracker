const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");
const query = require("./db/queries")

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                "Update an employee's role",
                'Exit'],
            name: "view"
        }

    ]).then((answer) => {
        console.log("")
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
            case "Update an employee's role": {
                updateEmployee();
                break;
            }
            case 'Exit': {
                db.end();
                process.exit(0);
            }
        }
    })
};

menu()

const viewAllDepartments = () => {
    query.fetchAllDepartments().then((result) => {
        console.table(result)
        menu();
    })
};

const viewAllRoles = () => {
    query.fetchAllRoles().then((result) => {
        console.table(result)
        menu();
    })
};

const viewAllEmployees = () => {
    query.fetchAllEmployee().then((result) => {
        console.table(result)
        menu();
    })
};

const addDepartment = () => {

    inquirer.prompt([
        {
            type: "input",
            message: "Name of the Department you would like to add!",
            name: "newDepartment"
        }

    ]).then(answer => {
        query.insertNewDepartment(answer.newDepartment).then((res) => {
            console.log(`Department ${answer.newDepartment} added.`)
            menu();
        })
    })
}

const addRole = () => {
    let departmentsMap = new Map()

    query.fetchAllDepartments().then((result) => {
        result.map(obj => departmentsMap.set(obj["departmentName"], obj["id"]))
        inquirer.prompt([
            {
                type: "input",
                message: "Name of the Role you would like to add!",
                name: "newRole"
            },
            {
                type: "input",
                message: "Salary Package for the Role!",
                name: "salary"
            },
            {
                type: "list",
                choices: [...departmentsMap.keys()],
                message: "Please select the department Id",
                name: "department"
            },
        ]).then(answer => {
            query.insertNewRole(answer.newRole, answer.salary, departmentsMap.get(answer.department)).then((res) => {
                console.log(`Role ${answer.newRole} added.`)
                menu();
            })
        })
    })
}

const addEmployee = () => {
    let rolesMap = new Map();
    let employeeMap = new Map();

    query.fetchAllRoles().then((result) => {
        result.map(obj => rolesMap.set(obj["title"], obj["id"]))

        query.fetchAllEmployee().then((result) => {
            result.map(obj => employeeMap.set(obj["FirstName"] + " " + obj["LastName"], obj["Id"]))

            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Employee's First Name?",
                    name: "FirstName"
                },
                {
                    type: "input",
                    message: "What is the Employee's Last Name?",
                    name: "LastName"
                },
                {
                    type: "list",
                    message: "What is the Employee's Role?",
                    choices: [...rolesMap.keys()],
                    name: "role"
                },
                {
                    type: "list",
                    message: "Who is the Employee's Manager?",
                    choices: ["None", ...employeeMap.keys()],
                    name: "manager"
                },
            ]).then(answer => {
                query.insertNewEmployee(answer.FirstName, answer.LastName, rolesMap.get(answer.role), employeeMap.get(answer.manager)).then((res) => {
                    console.log(`Employee ${answer.FirstName} ${answer.LastName} added.`)
                    menu();
                })
            })
        })
    })
}

const updateEmployee = () => {
    let rolesMap = new Map();
    let employeeMap = new Map();

    query.fetchAllEmployee().then(result => {
        result.map(obj => employeeMap.set(obj["FirstName"] + " " + obj["LastName"], obj["Id"]))

        query.fetchAllRoles().then((result) => {
            result.map(obj => rolesMap.set(obj["title"], obj["id"]))

            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role do you want to update?",
                    choices: [...employeeMap.keys()],
                    name: "employee"
                },
                {
                    type: "list",
                    message: "Select the new role?",
                    choices: [...rolesMap.keys()],
                    name: "role"
                }
            ]).then(answer => {
                query.updateEmployeeRole(employeeMap.get(answer.employee), rolesMap.get(answer.role)).then((res) => {
                    console.log(`Employee role for ${answer.employee} updated.`)
                    menu();
                })
            })
        })
    })
}




