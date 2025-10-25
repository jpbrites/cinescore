import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { generateShareLink, getSharedFavorites } from "../controllers/shareController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/share", authMiddleware, generateShareLink);

router.post("/favorites", authMiddleware, async (req, res) => {
  const { id, title, poster_path, type } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

  const alreadyExists = user.favorites.some((m) => m.id === id);
  if (alreadyExists) return res.status(400).json({ message: "Já nos favoritos." });

  user.favorites.push({ id, title, poster_path, type });
  await user.save();

  res.json(user.favorites);
});

router.delete("/favorites/:id", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  user.favorites = user.favorites.filter((m) => m.id != req.params.id);
  await user.save();
  res.json(user.favorites);
});

router.get("/favorites", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.favorites);
});

export default router;
