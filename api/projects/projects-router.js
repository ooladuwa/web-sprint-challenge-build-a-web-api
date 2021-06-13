const express = require("express");
const { checkProjectId } = require("../middlewares/middleware.js");

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

router.get("/:id", checkProjectId, (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ message: `Error: ${error}` });
    });
});

router.post("/", (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      if (!project.name || !project.description) {
        res.status(400).json({
          message: "Name, description and completion status are required!",
        });
      } else {
        res.status(201).json(project);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error creating the project" });
    });
});

router.put("/:id", checkProjectId, (req, res) => {
  // let changes = req.body;
  // let { id } = req.params;

  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error updating the project" });
    });
  // .then((project) => {
  //   if (project.id !== id) {
  //     res
  //       .status(404)
  //       .json({ message: "No project with the given ID was found" });
  //   } else if (!project.name || !project.description) {
  //     res.status(400).json({
  //       message: "Name, description and completion status are required!",
  //     });
  //   } else {
  //     res.status(200).json(project);
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  //   res.status(500).json({ message: "Error updating the project" });
  // });
});

router.delete("/:id", checkProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then(() => {
      res
        .status(201)
        .json({ message: "The project has been successfully deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: `Error: ${error}` });
    });
});

router.get("/:id/actions", checkProjectId, (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      res.status(200).json(project.actions);
    })
    .catch((error) => {
      res.status(500).json({ message: `Error: ${error}` });
    });
});

module.exports = router;
