const express = require('express');
const app = express();

//middleware
app.use(express.json());

//set routes
app.get ('/employees', async (req,res) => {
    //connect to MySQL database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

})

});

// start server
const port = process.env.PORT || 3000;
app.listen (port, () => {
    console.log('Server listening on port ${port}');

});

