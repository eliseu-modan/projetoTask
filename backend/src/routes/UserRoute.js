const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/Login.js"); // Corrigir o caminho para o módulo Login
const registerController = require("../controllers/Register.js");
const { isAdmin } = require("../services/authAdmin.js");

// Rota para autenticação
userRoutes.post("/auth/login", userController.login); // Supondo que há um método chamado login no módulo Login
userRoutes.post("/auth/register", isAdmin, registerController.register);
userRoutes.get("/auth/getUsers", isAdmin, registerController.getUsers);
userRoutes.delete(
  "/auth/deleteUser/:card",
  isAdmin,
  registerController.deleteUsers
);
userRoutes.patch("/auth/editUser/:id", isAdmin, registerController.editUser);
userRoutes.patch(
  "/auth/editPassword/:id",
  isAdmin,
  registerController.editPassword
);
module.exports = userRoutes;
