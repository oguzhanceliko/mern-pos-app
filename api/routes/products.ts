import express from "express";
import Product from "../models/Product";

const router = express.Router();

const addProductRoute = async (req: express.Request, res: express.Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(400).json();
  }
};

const getAllProductsRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
  }
};

const updateProductRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(400).json();
  }
};

const DeleteProductRoute = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item Deleted successfully.");
  } catch (error) {
    res.status(400).json();
  }
};

router.post("/add-product", addProductRoute);
router.get("/get-all", getAllProductsRoute);
router.put("/update-product", updateProductRoute);
router.delete("/delete-product", DeleteProductRoute);

export default router;
