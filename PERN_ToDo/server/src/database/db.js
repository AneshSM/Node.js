// *** PostgreSQL api ***
const Pool = require("pg").Pool;

// *** configure  database and user credential ***
const pool = new Pool({
  user: "postgres",
  password: "AnePsql204",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});
module.exports = pool;
