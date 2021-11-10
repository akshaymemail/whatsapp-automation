import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
const client = new Client();
export const generateQr = (req, res) => {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    res.status(200).json({ qr });
  });
  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.initialize();
};

export const sendMessage = async (req, res) => {
  const { number, message } = req.body;
  const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
  const final_number = `91${sanitized_number.substring(
    sanitized_number.length - 10
  )}`; // add 91 before the number here 91 is country code of India

  const number_details = await client.getNumberId(final_number); // get mobile number details

  if (number_details) {
    const sendMessageData = await client.sendMessage(
      number_details._serialized,
      message
    );
    res.status(200).json({ sendMessageData });
  } else {
    res.status(401).json("Mobile number is not registered with WhatsApp");
  }
};
