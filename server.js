const app = require("./backend/app.js");
const dotenv = require("dotenv");


// handling uncought Exception
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);

})


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
};


//databases
require('./backend/connection/connection.js')
require('./backend/database/userTable.js');
require('./backend/database/expenseTable.js');
require('./backend/database/categoryTable.js')


// assigning port to server
const server = app.listen(process.env.SERVERPORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.SERVERPORT}`);
});


// unhandled promise rejaection
process.on("unhandledRejection", err =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit(1);
    })

})