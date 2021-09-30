const { Pool } = require("pg");
const config = require("../config.js");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: config.password,
  port: 3000,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

module.exports = pool;
