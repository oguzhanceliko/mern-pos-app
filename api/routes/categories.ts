import express from "express";
import {
  DeleteCategoryRoute,
  addCategoryRoute,
  getAllCategoriesRoute,
  updateCategoryRoute,
} from "../controllers/categories";

const router = express.Router();

router.post("/add-category", addCategoryRoute);
router.get("/get-all", getAllCategoriesRoute);
router.put("/update-category", updateCategoryRoute);
router.delete("/delete-category", DeleteCategoryRoute);

export default router;
