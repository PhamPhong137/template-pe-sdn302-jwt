const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
require("dotenv").config();

const connectDb = require ("./config/db");
const db = require("./models");
const ApiRouter = require("./routes/api.route");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
    res.status(200).send({ message: "Welcome to Restful API server" });
});

//Recieve request 
app.use("/", ApiRouter);

app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status || 500,
        res.send({
            "error": {
                "status": err.status || 500,
                "message": err.message
            }
        });
})

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 9999;

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at: http://${HOSTNAME}:${PORT}`);
    //Connect database 
    connectDb();
});