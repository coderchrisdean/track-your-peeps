

// drop connection to database
const dropConnection = (connection) => {
    console.log("Thank you for using Track Your Peeps!");
    connection.end();
    process.exit();
    
  };

module.exports = dropConnection;
