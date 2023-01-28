function dropConnection(connection) {
  connection.end(function (err) {
    if (err) {
      console.log("Error ending connection: " + err.stack);
      return;
    }
    console.log("Connection closed successfully.");
  });
}

module.exports = dropConnection;
