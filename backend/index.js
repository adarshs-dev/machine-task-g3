import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import startOverdueCron from './cron/overdueCron.js';
import { fileURLToPath } from 'url';

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.options("/*", cors());

app.use(express.json());

// static serve uploads
const uploadsDir = process.env.UPLOADS_DIR || 'uploads';
app.use('/' + uploadsDir, express.static(path.join(__dirname, uploadsDir)));

// routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  // start cron
  startOverdueCron();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
