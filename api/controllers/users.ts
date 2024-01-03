import express from "express";
import User from "../models/User";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
  }
};

export const getUsersById = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.body.userId;
  // const userId = req.params.userId;

  console.log("userId", userId);
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
  }
};
