import express from "express";
import { addBill, getAllBills } from "../controllers/bills";

const router = express.Router();

router.post("/add-bill", addBill);
router.get("/get-all", getAllBills);

export default router;
