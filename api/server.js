// Imports
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const server = express();

// Global Middleware
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// Endpoints
server.get("/", (req, res) => {
  res.send(`
    <h1>Unit Four Sprint Challenge #1</h1>
    <h3>A project by Naj</h3>
  `);
});

module.exports = server;
