import express from "express";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
} from "../controllers/carsController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, adminOnly, createCar);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

export default router;
