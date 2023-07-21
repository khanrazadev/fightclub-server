import express from "express";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});
const app = express();

// Importing & using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
app.use("/api/v1", course);
app.use("/api/v1", user);
export default app;
