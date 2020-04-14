const router = require("express").Router();
const {
  get,
  insert,
  update,
  remove,
} = require("../../data/helpers/actionModel");

const Project = require("../../data/helpers/projectModel");

// GET /api/actions
router.get("/", (req, res, next) => {
  get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) =>
      res
        .status(500)
        .json({
          errorMessage: "Something went wrong when trying to get actions",
        })
    );
});
// GET /api/actions/:id
router.get("/:id", validateActionId, (req, res, next) => {
  get(req.action.id)
    .then((action) => res.status(200).json(action))
    .catch((err) =>
      res
        .status(500)
        .json({
          errorMessage: "Something went wrong when trying to get the action",
        })
    );
});

// POST /api/actions
router.post("/", validateAction, (req, res, next) => {
  insert(req.body)
    .then((action) => res.status(201).json(action))
    .catch((err) =>
      res
        .status(500)
        .json({
          errorMessage: "Something went wrong while trying to add action",
        })
    );
});
// PUT /api/actions/:id
router.put("/:id", validateActionId, (req, res, next) => {
  const { description, notes, completed } = req.body;
  if (description || notes || completed) {
    update(req.params.id, { description, notes, completed })
      .then((action) => res.status(200).json(action))
      .catch((err) =>
        res
          .status(500)
          .json({
            errorMessage:
              "Something went wrong when trying to update the action",
          })
      );
  } else {
    res
      .status(400)
      .json({
        message:
          "need to include at least description, notes, or completed property",
      });
  }
});

// DELETE /api/actions/:id
router.delete('/:id', validateActionId, (req, res, next) => {
    remove(req.action.id)
    .then(count => res.status(200).json({message: "action was successfully deleted"}))
    .catch(err => res.status(500).json({errorMessage: "Something went wrong when trying to delete the action"}))
});

function validateActionId(req, res, next) {
  if (req.params.id) {
    get(req.params.id).then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "action was not found" });
      }
    });
  } else {
    res.status(400).json({ message: "Please use url /api/actions/:id" });
  }
}

function validateAction(req, res, next) {
  if (req.body.project_id) {
    if (req.body.description && req.body.notes) {
      Project.get(req.body.project_id)
        .then((project) => {
          if (project) {
            next();
          } else {
            res.status(400).json({ message: "project not found" });
          }
        })
        .catch((err) =>
          res
            .status(500)
            .json({
              errorMessage: "Something went wrong when adding the action",
            })
        );
    } else {
      res.status(400).json({ message: "description and notes are required" });
    }
  } else {
    res.status(400).json({ message: "project_id is required" });
  }
}

module.exports = router;
