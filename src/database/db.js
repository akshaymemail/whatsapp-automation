import MySQL from "mysql2";

const db = MySQL.createConnection({
  host: "localhost",
  user: "root",
  database: "employees"
});

export default db;
