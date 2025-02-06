import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// const dotenv = require('dotenv');
import dotenv from "dotenv";
import routes from "./src/routes/routes.js";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://lms-obc.netlify.app/"],
  credentials: true,
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
