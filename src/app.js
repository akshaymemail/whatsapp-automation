import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./api/routes/userAuthRoutes.js";
import whatsAppRouter from "./api/routes/whatsappRutes.js";
import cors from "cors";
import puppeteer from "puppeteer";

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// CONSTANTS
const PORT = process.env.PORT || 4000;
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium-browser"
});

// ROUTES
app.use("/apiv1/user", userRouter);
app.use("/apiv1/client", whatsAppRouter);

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).send({ message: "Node Is Here!" });
});

// SPINNING THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
