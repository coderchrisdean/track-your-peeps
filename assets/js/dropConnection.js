// require('dotenv').config();
const mysql = require("mysql");

function dropConnection(connection) {
  {
    connection.end();
    console.log("connection ended");
  }
}
module.exports = dropConnection;
