const jwt = require("jsonwebtoken");
const config = require("config");

const secretKey = config.get("jwtSecret");

function authenticateToken(req, res, next) {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token de acesso não fornecido" });
  }
  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }
  const token = authorizationHeader.substring(7);
  console.log("token chegou no backend", token);
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token inválido:", error);
    return res
      .status(401)
      .json({ message: "Token de acesso inválido ou expirado" });
  }
}

module.exports = authenticateToken;
