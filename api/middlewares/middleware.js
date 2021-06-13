const Projects = require("../projects/projects-model");
const Actions = require("../actions/actions-model");

const checkProjectId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (!project) {
      res.status(404).json(`No project with id: ${id} was found`);
    } else {
      req.project = project;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};

const checkActionId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json(`No action with id: ${id} was found`);
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};
module.exports = {
  checkProjectId,
  checkActionId,
};
