import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

//Routes
import categoryRoute from "../routes/categories";
import productRoute from "../routes/products";
import billRoute from "../routes/bills";
import authRoute from "../routes/auth";
import userRoute from "../routes/users";

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};
//Connected Middlewares
app.use(express.json());
app.use(cors());

//-----------------------------------------------------------------------------

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  connect();
  console.log("Server Running on port: " + PORT);
});
