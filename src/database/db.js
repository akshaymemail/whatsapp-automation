import MySQL from "mysql2";

const db = MySQL.createConnection({
  host: "164.52.207.204",
  user: "ankit",
  password: "1232245895",
  database: "whatsapp"
});

export default db;
