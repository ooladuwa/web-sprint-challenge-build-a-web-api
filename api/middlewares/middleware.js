const Projects = require("../projects/projects-model");

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

module.exports = {
  checkProjectId,
};
