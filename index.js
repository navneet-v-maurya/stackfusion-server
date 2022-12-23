import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/UserRoutes.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    app.listen(PORT, () => {
      console.log(`server connected to port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });

app.use("/user", userRoute);
app.use("/", (req, res) => {
  res.send("hello to stackfusion api");
});
