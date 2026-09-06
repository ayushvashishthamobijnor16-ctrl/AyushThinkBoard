import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./config/upstash.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",   // ✅ colon, not comma
}));


// middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// rate limiter middleware
app.use(async (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ message: "Too many requests, please try again later" });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); // fail open if Upstash itself has an issue
  }
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


 