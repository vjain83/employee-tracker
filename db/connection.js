// connect or database
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employee_tracker_db'
},
    console.log('Connected to employee database')
)

module.exports = db;