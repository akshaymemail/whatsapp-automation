import { nanoid } from "nanoid";
import db from "../../database/db.js";
import { Client } from "whatsapp-web.js";

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox"]
  }
});
export const generateQr = (req, res) => {
  client.initialize();
  client = client;
  let isSent = true;
  client.on("qr", (qr) => {
    if (isSent) {
      client.removeListener("qr", (e) => {
        console.log(e);
      });
      res.status(200).json({ qrCode: qr });
      isSent = false;
    }
  });
};

export const isAuthenticated = (req, res) => {
  req.client.on("authenticated", (session) => {
    let isDone = true;
    if (isDone) {
      db.execute(
        `INSERT INTO instance (username, sessionid, status) VALUES (?,?,?)`,
        ["n/a", JSON.stringify(session), true],
        (err, result) => {
          if (err) {
            isDone = false;
            res.status(500).json({
              success: false,
              message: "Error while saving session"
            });
          }
          isDone = false;
          res.status(200).json({
            success: true,
            message: "Session saved",
            instant_id: result.insertId
          });
        }
      );
    }
  });
};

export const sendMessage = async (req, res) => {
  const { number, message, instanceid, messageType, media } = req.body;
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
    db.execute(
      `INSERT INTO messages (messageid, username, instanceid, mobile, messageType, message, media, status) VALUES (?,?,?,?,?,?,?,?)`,
      [
        nanoid(),
        req.user.email,
        instanceid,
        number,
        messageType,
        message,
        media,
        true
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error while sending message"
          });
        }
        return res.status(200).json({ sendMessageData });
      }
    );
  } else {
    res.status(401).json("Mobile number is not registered with WhatsApp");
  }
};

export const checkSession = (req, res) => {
  db.query(
    `SELECT status FROM instance WHERE id = '${req.body.id}'`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error while checking session"
        });
      }
      if (result.length < 1) {
        return res.status(400).json({
          success: false,
          message: "session does not exist"
        });
      }
      const data = result[0];
      if (data.status) {
        res.status(200).json({
          status: true,
          message: "Session is active"
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Session is inactive"
        });
      }
    }
  );
};

export const resetSession = (req, res) => {
  db.query(
    `SELECT id FROM instance WHERE id = '${req.body.id}'`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error while checking session"
        });
      }
      if (result.length < 1) {
        return res.status(400).json({
          success: false,
          message: "session does not exist"
        });
      }
      const data = result[0];
      db.query(
        `UPDATE instance SET status = ${false}
      WHERE id=${data.id}`,
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error while resetting session"
            });
          }
          return res.status(200).json({
            success: true,
            message: "Session reset"
          });
        }
      );
    }
  );
};
