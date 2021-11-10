import express from "express";
import { generateQr, sendMessage } from "../controllers/whatsappControllers.js";

// CREATING  ROUTER
const whatsAppRouter = express.Router();

// SIGNUP ROUTE
whatsAppRouter.get("/generate_qr", generateQr);

whatsAppRouter.post("/send_message", sendMessage);

export default whatsAppRouter;
