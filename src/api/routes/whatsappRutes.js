import express from "express";
import {
  checkSession,
  generateQr,
  isAuthenticated,
  resetSession,
  sendMessage
} from "../controllers/whatsappControllers.js";

// CREATING  ROUTER
const whatsAppRouter = express.Router();

// SIGNUP ROUTE
whatsAppRouter.get("/generate_qr", generateQr);
whatsAppRouter.get("/is_authenticated", isAuthenticated);
whatsAppRouter.post("/check_session", checkSession);
whatsAppRouter.post("/send_message", sendMessage);
whatsAppRouter.post("/reset_session", resetSession);

export default whatsAppRouter;
