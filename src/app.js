import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./api/routes/userAuthRoutes.js";

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());

// CONSTANTS
const PORT = process.env.PORT || 5000;

// ROUTES
app.use("/api/user", userRouter);

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).send({ message: "Node Is Here!" });
});

// SPINNING THE SERVER
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
