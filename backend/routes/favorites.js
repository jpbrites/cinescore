import express from "express";
import {
  getFavoriteList,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController.js";
import { getSharedFavorites } from "../controllers/shareController.js";


const router = express.Router();

// Rotas
router.get("/:userId", getFavoriteList);
router.post("/", addFavorite);
router.delete("/:userId/:movieId", removeFavorite);
router.get("/share/:token", getSharedFavorites);

export default router;
