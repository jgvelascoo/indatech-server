import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserDB from "../models/User.js";


const secret = 'test';


export const signin = async (req, res) => {

  try {

    const { email, password } = req.body;
    const oldUser = await UserDB.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "60s" });
    res.status(200).json({ result: oldUser, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }

};


export const signup = async (req, res) => {
  
  try {

    const { email, password, firstName, lastName } = req.body;
    const oldUser = await UserDB.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserDB.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

    res.json({ message: "User added successfully." });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }

};