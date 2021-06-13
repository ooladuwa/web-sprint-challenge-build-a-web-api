// Write your "projects" router here!
const express = require("express");
const { default: knex } = require("knex");

const Project = require("./projects-model.js");

const router = express.Router();

// projects endpoints

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});
module.exports = router;

router.get("/:id", (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "No project with that ID was found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the project" });
    });
});
