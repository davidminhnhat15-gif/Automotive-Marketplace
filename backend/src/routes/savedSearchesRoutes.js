import express from "express";
import {
  createSavedSearch,
  deleteSavedSearch,
  getSavedSearches,
} from "../controllers/savedSearchesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSavedSearches);
router.post("/", protect, createSavedSearch);
router.delete("/:id", protect, deleteSavedSearch);

export default router;
