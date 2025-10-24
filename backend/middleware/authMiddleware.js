import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_super_segura";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};
