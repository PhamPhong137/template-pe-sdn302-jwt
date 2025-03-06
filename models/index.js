const mongoose = require("mongoose");
const User = require("./user.model");

const db = {}

// Define schema
db.User = User;


module.exports = db;