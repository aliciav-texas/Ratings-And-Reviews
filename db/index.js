const { Pool } = require("pg");
const config = require("./config.js");

// ===== Create a new pool with configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ratingsandreviews",
  password: config.password,
  port: 3000,
});

// ===== Connect to Postgres
pool
  .connect()
  .then(() => {
    console.log("Connected to postgres");
  })
  .catch(() => {
    console.log("failed to connect to postgres");
  });

module.exports = pool;
