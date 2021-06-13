const express = require("express");
const { checkActionId } = require("../middlewares/middleware.js");
const { confirmProjectStatus } = require("../middlewares/middleware.js");

const Action = require("./actions-model");

const router = express.Router();

// actions endpoints

router.get("/", (req, res) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the actions",
      });
    });
});

router.get("/:id", checkActionId, (req, res) => {
  Action.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      res.status(500).json({ message: `Error: ${error}` });
    });
});

router.post("/", confirmProjectStatus, (res, req) => {
  Action.insert(req.body)
    .then((action) => {
      if (!action.project_id || !action.description || !action.notes) {
        res
          .status(400)
          .json({ message: "Description and notes are required." });
      } else {
        res.status(201).json(action);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error creating the action" });
    });
});

module.exports = router;
