const router = require("express").Router();
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("../../data/helpers/projectModel");

// GET /api/projects
router.get("/", (req, res, next) => {
  get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          errorMessage: "Something went wrong when trying to get projects",
        });
    });
});

// GET /api/projects/:id
router.get("/:id", validateProjectID, (req, res, next) => {
  res.status(200).json(req.project);
});

// GET /api/projects/:id/actions
router.get("/:id/actions", validateProjectID, (req, res, next) => {
  const { id } = req.project;
  getProjectActions(id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) =>
      res
        .status(500)
        .json({
          errorMessage:
            "Something went wrong when trying to get the actions for this project id",
        })
    );
});

// POST /api/projects/
router.post("/", (req, res, next) => {
  if (req.body.name && req.body.description) {
    insert(req.body)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) =>
        res
          .status(500)
          .json({ errorMessage: "Something went wrong when adding project" })
      );
  } else {
      res.status(404).json({message: "name and description properties are required"})
  }
});

// PUT /api/projects/:id
router.put('/:id', validateProjectID, (req, res, next) => {
    const {name, description, completed} = req.body;
    if(req.body.name || req.body.description || req.body.completed){
        update(req.project.id, {name, description, completed})
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({errorMessage: "Something went wrong when trying to update project"}))
    } else {
        res.status(400).json({message: "name, description, or completed properties need to be included in body"})
    }
})

// DELETE /api/projects/:id
router.delete('/:id', validateProjectID, (req, res, next) => {
    remove(req.project.id)
    .then(count => {
        res.status(200).json({message: "project was sussessfully deleted"})   
    })
    .catch(err => res.status(500).json({errorMessage: "Something went wrong when trying to delete project"}))
})

function validateProjectID(req, res, next) {
  if (req.params.id) {
    get(req.params.id).then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Project with that ID was not found" });
      }
    });
  } else {
    res.status(400).json({ message: "Please use url /api/projects/:id" });
  }
}

module.exports = router;
