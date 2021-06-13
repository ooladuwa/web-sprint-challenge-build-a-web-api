const Action = require("./actions-model");
const express = require("express");

const router = express.Router();

// actions endpoints

router.get("/", (req, res) => {
  Action.get(req.query)
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
module.exports = router;
