import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "1974",
  host: "localhost",
  port: 5432,
  database: "users_v3",
});

export default pool;
