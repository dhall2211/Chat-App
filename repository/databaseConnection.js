const mysql = require("mysql");
require('dotenv').config();


const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "chatapp",
});
console.log(process.env.USER, process.env.PASSWORD);

// test

module.exports = connection;
