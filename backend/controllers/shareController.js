// controllers/shareController.js
import crypto from "crypto";
import User from "../models/User.js";

// Gera ou retorna link de compartilhamento
export const generateShareLink = async (req, res) => {
  try {
    const userId = req.userId; // vem do token JWT (authMiddleware)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    // se já existir token, reutiliza
    if (!user.shareToken) {
      user.shareToken = crypto.randomBytes(8).toString("hex");
      await user.save();
    }

    const link = `${"https://cinescore-front.vercel.app"}/favorites/share/${user.shareToken}`;
    res.json({ link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao gerar link de compartilhamento." });
  }
};

// Acessa lista pública via token
export const getSharedFavorites = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ shareToken: token });

    if (!user)
      return res.status(404).json({ message: "Link inválido ou expirado." });

    res.json({
      name: user.name,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar lista compartilhada." });
  }
};
