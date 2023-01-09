const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
  });

module.exports = connection;