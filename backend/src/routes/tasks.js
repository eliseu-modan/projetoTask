const express = require("express");
const tasks = express.Router();
const createTasks = require("../controllers/CreateTasks.js"); // Corrigir o caminho para o módulo Login
const authMiddleware = require("../services/authMiddleware.js");
// Rota para autenticação
tasks.post("/auth/tasks", authMiddleware, createTasks.create);
tasks.get("/auth/getTasks", authMiddleware, createTasks.getTasks);
tasks.delete(
  `/auth/removeTasks/:taskSelected`,
  authMiddleware,
  createTasks.deleteTask
);
tasks.patch("/auth/updateTask/:id", authMiddleware, createTasks.updateTask); // Ajuste aqui

module.exports = tasks;
