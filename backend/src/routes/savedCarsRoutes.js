import express from "express";
import {
  getSavedCars,
  removeSavedCar,
  saveCar,
} from "../controllers/savedCarsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSavedCars);
router.post("/:carId", protect, saveCar);
router.delete("/:carId", protect, removeSavedCar);

export default router;
