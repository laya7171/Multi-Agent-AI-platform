import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8002;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Agent server is running" });
});

app.listen(PORT, () => {
  console.log(`Agent server is running on port ${PORT}`);
  connectDB();
});
