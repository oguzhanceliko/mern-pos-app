import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const Register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json("A new User created successfully.");
  } catch (error) {
    res.status(400).json();
  }
};

export const Login = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ Error: "User not found!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password as string
    );

    if (!validPassword) {
      return res.status(403).json({ Error: "Invalid password!" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json();
  }
};
