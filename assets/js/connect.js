// configure dotenv
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const cTable = require("console.table");

// create the connection to database
console.log(process.env.DB_USER)

function connect() {
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASS,
  database: "employee_db",
  port: process.env.DB_PORT,
});

console.log(`Connected to the employee_db database.`);
connection.query("SELECT * FROM employee", function (err, results) {
  if (err) throw err;
  console.table(results);
});
}

module.exports = connection;
