import MySQL from "mysql2";

const db = MySQL.createConnection({
  host: "localhost",
  user: "ankit",
  password: "1232245895",
  database: "whatsapp"
});

export default db;
