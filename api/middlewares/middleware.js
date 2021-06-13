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

const validateProject = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please be sure to include name and description." });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
};

const validateAction = (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message:
        "Please be sure to include a project id, a description, and notes.",
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.notes = notes;
    next();
  }
};

module.exports = {
  checkProjectId,
  checkActionId,
  validateProject,
  validateAction,
};
