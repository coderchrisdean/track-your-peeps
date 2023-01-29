// end mysql2 connection

const dropConnection = require("./connect");

// function to drop connection
connection.end();
console.log("Connection ended");
module.exports = dropConnection;