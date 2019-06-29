var express = require("express");
var morgan = require("morgan");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var expressValidator = require("express-validator");
var getPosts = require("./routes/user");
var app = express();
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => { console.log("DB connected") })
mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
})

// middleware
const applyMiddleware = (req, res, next) => {
    console.log("middleware applied!!!");
    next();
}
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(applyMiddleware);

// routes
app.use("/", getPosts);

// open server
var port = process.env.PORT;
app.listen(port || 8080, () => { console.log(`Nodejs listenning ${port || 8080}`) });
