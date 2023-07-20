import express from "express";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});
const app = express();

// Importing & using Routes
import course from "./routes/courseRoutes.js";
app.use("/api/v1", course);
export default app;
