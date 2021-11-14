// connect or database
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employee_tracker_db'
})

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected in Query.');
});

module.exports = db;