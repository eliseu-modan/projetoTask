const bcrypt = require("bcryptjs");
const prisma = require("../importPrisma");

exports.register = async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    const existingUser = await prisma.createUser.findUnique({
      where: {
        email,
      },
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(401).json({ message: "Este email já está em uso." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.createUser.create({
      data: {
        email,
        password: hashedPassword,
        admin,
      },
    });
    console.log("Usuario Registrado", email, password);
    return res.json("usuarios");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let userQuery = {
      select: {
        id: true,
        email: true,
        admin: true,
      },
    };

    if (typeof search === "string" && search.trim() !== "") {
      userQuery = {
        ...userQuery,
        where: {
          email: {
            contains: search,
          },
        },
      };
    }

    const users = await prisma.createUser.findMany(userQuery);

    console.log("dados resgatados", users);
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const idUser = req.params.card;
    const id = parseInt(idUser, 10);
    const deletetask = await prisma.createUser.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send();
  } catch (error) {}
};

exports.editUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const newDataUser = req.body;
    const id = parseInt(idUser, 10);
    const updatedUser = await prisma.createUser.update({
      where: { id: id },
      data: newDataUser,
    });
    res.send(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.editPassword = async (req, res) => {
  try {
    const newPassword = req.body;
    const { password } = newPassword;
    var id = req.params.id;
    console.log("password", password, id);
    id = parseInt(id, 10);

    newPassword.password = await bcrypt.hash(password, 10);
    console.log("valores de password", newPassword);
    const updatePassword = await prisma.createUser.update({
      where: { id: id },
      data: { password: newPassword.password },
    });

    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);

    res.status(500).json({ error: "Erro ao atualizar senha." });
  }
};
