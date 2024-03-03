const bcrypt = require("bcryptjs");
const prisma = require("../importPrisma");
const jwt = require("jsonwebtoken");
const CreateTasks = require("./CreateTasks");
const config = require("config");
const Admin = require("../services/authAdmin");

let userId = null; // Inicializa userId como null

function generateJwtToken(userId, expirationTimeInSeconds) {
  try {
    const secretKey = config.jwtSecret;

    const expirationDate =
      Math.floor(Date.now() / 1000) + expirationTimeInSeconds;

    const token = jwt.sign({ userId, exp: expirationDate }, secretKey);

    console.log("Token criado:", token);
    return token;
  } catch (error) {
    console.error("Erro ao gerar o token:", error);
    throw error;
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const value = { email, password };

    const verifyUser = await prisma.createUser.findUnique({
      where: {
        email,
      },
    });
    if (!verifyUser) {
      console.log("EMAIL NÃO ENCONTRADO");
      return res.status(401).json({ message: "Usuário não encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, verifyUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: `Senha Incorreta` });
    } else {
      userId = verifyUser.id;

      const userWithAdminInfo = await prisma.createUser.findUnique({
        where: {
          id: userId,
        },
        select: {
          admin: true,
        },
      });
      const isAdmin = userWithAdminInfo?.admin || false;
      await Admin.isAdminMiddleware(isAdmin);
      const token = generateJwtToken(userId, 30000);
      CreateTasks.AssociationMessageId(userId);

      return res
        .status(200)
        .json({ token, userId, message: "Login Bem Sucedido" });
    }
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    return res.status(500).json({ message: "Erro durante a autenticação" });
  }
};
module.exports = {
  login,
};
