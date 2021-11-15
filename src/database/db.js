import MySQL from "mysql2";

let db = {};

try {
  db = MySQL.createConnection({
    host: "localhost",
    user: "ankit",
    password: "1232245895",
    database: "employees"
  });
} catch (error) {
  console.log(error);
}

export default db;
