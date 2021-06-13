const express = require("express");
const {
  checkActionId,
  checkProjectId,
} = require("../middlewares/middleware.js");
const { validateAction } = require("../middlewares/middleware.js");
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

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", checkActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.delete("/:id", checkActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(() => {
      res
        .status(201)
        .json({ message: "The action has been successfully deleted" });
    })
    .catch(next);
});

module.exports = router;
