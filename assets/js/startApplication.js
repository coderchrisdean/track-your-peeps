//this file is used to start application
const figlet = require('figlet');




    // Display the application title with figlet
function startApplication() {
    figlet.text("Track Your Peeps",{
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
    }, function(err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data)
        // wait 3 seconds before prompting the user
        setTimeout (function() {
            promptUser();
        }, 3000);
    });
}

module.exports = start;
