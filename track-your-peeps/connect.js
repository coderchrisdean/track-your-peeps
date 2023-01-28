// Create a connection to the database with mysql2 
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const connection = mysql.createConnection   ({
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: process.env.DB_PASS,
    database: "employee_db"
});
module.exports = connection;