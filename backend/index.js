import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 5000;
const PASSWORD = process.env.PASS;

// app.use(cors());
app.use(cors({
  origin: '*',
 }));

app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    `mongodb+srv://rishujain0721:${PASSWORD}@cluster0.ablq41v.mongodb.net/studentBazaar`
  )
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
