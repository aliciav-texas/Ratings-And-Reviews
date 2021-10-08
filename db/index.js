const { Pool } = require("pg");
const config = require("./config.js");

// ===== Create a new pool with configuration
const pool = new Pool({
  user: "postgres",
  host: config.host,
  database: "ratingsandreviews",
  password: config.password,
  port: 5432,
});

// ===== Connect to Postgres
pool
  .connect()
  .then(() => {
    console.log("Connected to postgres");
  })
  .catch(() => {
    console.log("Failed to connect to postgres");
  });

module.exports = pool;
