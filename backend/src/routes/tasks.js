const express = require("express");
const tasks = express.Router();
const createTasks = require("../controllers/CreateTasks.js");
const authMiddleware = require("../services/authMiddleware.js");
tasks.post("/auth/tasks", authMiddleware, createTasks.create);
tasks.get("/auth/getTasks", authMiddleware, createTasks.getTasks);
tasks.delete(
  `/auth/removeTasks/:taskSelected`,
  authMiddleware,
  createTasks.deleteTask
);
tasks.patch("/auth/updateTask/:id", authMiddleware, createTasks.updateTask);
tasks.put(
  "/auth/concluidedTask/:taskSelected",
  authMiddleware,
  createTasks.concluidedTask
);
tasks.get(
  "/auth/getTasksConcluided",
  authMiddleware,
  createTasks.getTasksConcluided
);
tasks.get(
  "/auth/getTasksPermanent",
  authMiddleware,
  createTasks.getTasksPermanent
);

module.exports = tasks;
