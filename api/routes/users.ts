import express from "express";
import { getAllUsers, getUsersById } from "../controllers/users";

const router = express.Router();

router.get("/get-all", getAllUsers);
router.get("/get-user-by-id", getUsersById);

export default router;
