import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Konversi __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Konfigurasi PORT dan HOST
const PORT = process.env.PORT || 8000;
const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(authRoutes);
app.use(taskRoutes);
app.use(userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Koneksi ke database & Jalankan server
connectDB()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // Keluar jika gagal koneksi database
  });
