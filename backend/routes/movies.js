import express from "express";
import { getAllMedia, getAllCategories, searchMedia, getMovieDetails } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/allMedia", getAllMedia);
router.get("/allCategories", getAllCategories);
router.get("/search", searchMedia);
router.get("/:id", getMovieDetails);

export default router;
