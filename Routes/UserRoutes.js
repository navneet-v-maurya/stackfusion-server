import express from "express";
import { addUser, getData } from "../Controllers/UserController.js";

const userRoute = express.Router();
userRoute.post("/adduser", addUser);
userRoute.get("/getdata", getData);

export default userRoute;
