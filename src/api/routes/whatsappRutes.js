import express from "express";
import { generateQr } from "../controllers/whatsappControllers.js";

// CREATING  ROUTER
const whatsAppRouter = express.Router();

// SIGNUP ROUTE
whatsAppRouter.get("/generate_qr", generateQr);

export default whatsAppRouter;
