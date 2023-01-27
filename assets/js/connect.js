// configure dotenv
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const cTable = require("console.table");

// create the connection to database


function connect() {
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: 'simple',
  database: "employee_db",
  port: process.env.DB_PORT,
});

console.log(`Connected to the employee_db database.`);
connection.query("SELECT * FROM employee", function (err, results) {
  if (err) throw err;
  
});
}

module.exports = connect;