const express = require("express");
const userRoutes = require("./UserRoute");
const tasks = require("./tasks");
const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/tasks", tasks);

module.exports = routes;
