import MySQL from "mysql2";

const db = MySQL.createConnection({
  host: "localhost",
  user: "root",
  //password: "1232245895",
  database: "employees"
});

export default db;
