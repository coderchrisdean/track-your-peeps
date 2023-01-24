// Connect to SQL database
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();


// MySQL Connection (data stored in .env file)
module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // Username
    user: process.env.DB_USER,
    // Password
    password: process.env.DB_PASS,
    // Database
    database: process.env.DB_NAME
});