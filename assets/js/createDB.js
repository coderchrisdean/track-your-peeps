const path = require('path');
const fs = require('fs');

// create database function after connection is successful from connect.js and run schema.sql and seeds.sql
module.exports = function createDB() {
    // read the schema.sql file
    let schema = fs.readFile(path.join(__dirname, '../db/schema.sql'), 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        // run the schema.sql file

        connection.query(schema, (err, results) => {
            if (err) throw err;
            console.log(results);
        });


    });
    // read the seeds.sql file
    let seeds = fs.readFile(path.join(__dirname, '../db/seeds.sql'), 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        // run the seeds.sql file
        connection.query(seeds, (err, results) => {
            if (err) throw err;
            console.log(results);
        });
    });
}






// Path: track-your-peeps\assets\js\connect.js

