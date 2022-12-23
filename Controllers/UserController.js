import User from "../models/UserModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let tranporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

//register a new user
export const addUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber, gender, dateOfBirth } =
    req.body;
  const newUser = new User({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBirth,
  });

  try {
    if (await User.findOne({ email })) {
      return res
        .status(404)
        .json({ message: "user with this email alreday exists" });
    }
    const user = await newUser.save();
    res.status(200).json({ user });

    let details = {
      from: process.env.GMAIL,
      to: user.email,
      subject: "Testing Notification",
      text: `Hello ${user.firstName}, this message is sent just for the testing purpose!!`,
    };

    tranporter.sendMail(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {}
};
