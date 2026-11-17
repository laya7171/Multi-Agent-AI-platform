import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config();
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controller/user.controller.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())
app.use("/auth", proxy(process.env.AUTH_SERVICE_URL));
app.get("/me", protect, getCurrentUser)

app.get("/", (req, res) => {
    res.json({ message: "Gateway server is running" })
}
)

app.listen(PORT, () => {
    console.log(`Gateway server is running on port ${PORT}`);
}
)