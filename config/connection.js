// configure dotenv
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

// create the connection to database



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employee_db",
  port: process.env.DB_PORT,
});

console.log(`Connected to the employee_db database.`);
connection.query("SELECT * FROM employee", function (err, results) {
  if (err) throw err;
  
});




module.exports = connection;
