import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";
import { DATABASE } from "./config.js";
import { config as configDotenv } from 'dotenv';

configDotenv({
  path: './.env', 
  encoding: 'utf8', 
  debug: true, 
});

const app = express();

//db
mongoose.connect(DATABASE)
    .then(()=> console.log("db_connected2"))
    .catch((err)=> console.log(err));

//middlewares
app.use(express.json({limit:"10mb"}));
app.use(morgan("dev"));
app.use(cors());
//routes middleware

app.use("/api", authRoutes);
app.use("/api", adRoutes);

app.listen(8000, () => {
    console.log("server started");
    console.log(process.env.DATABASE);
});