const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")


const path = require('path')

const app  = express();


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
}

app.use(express.json());
app.use('/storage', express.static(path.join(__dirname, '/storage')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/userRoute");
const category = require('./routes/categoryRoute')
const expense = require('./routes/expenseRoute')


app.use("/api/v1", user);
app.use("/api/v1", category);
app.use("/api/v1", expense)

// Middleware for erroe
app.use(errorMiddleware)


module.exports = app