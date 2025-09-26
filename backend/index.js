import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'



dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected✅ "))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
