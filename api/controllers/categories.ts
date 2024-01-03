import express from "express";
import Category from "../models/Category";

export const addCategoryRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllCategoriesRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCategoryRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const DeleteCategoryRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Item Deleted successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
};
