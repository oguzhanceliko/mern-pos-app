import express from "express";
import Bill from "../models/Bill";

export const addBill = async (req: express.Request, res: express.Response) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json();
  }
};

export const getAllBills = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.log("error", error);
  }
};
