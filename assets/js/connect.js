// configure dotenv
require('dotenv').config();
const mysql = require('mysql2');



const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employee_db'
});

// if connection is successful, console log the message and run queries
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to server.`);    

}
);

module.exports = connection;