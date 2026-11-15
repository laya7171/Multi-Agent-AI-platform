import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Auth server is running" })
}
)

app.listen(PORT, () => {
    console.log(`Auth server is running on port ${PORT}`);
    connectDB();
}
)