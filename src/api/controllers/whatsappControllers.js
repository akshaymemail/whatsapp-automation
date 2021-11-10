import { Client } from "whatsapp-web.js";
export const generateQr = (req, res) => {
  const client = new Client();
  client.on("qr", (qr) => {
    res.status(200).json({ qr });
  });
  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.initialize();
};
