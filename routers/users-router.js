const router = require("express").Router();

// add models
const {
  findAll,
  findById
} = require("../models/users-model");

// middleware
const restricted = require("../middleware/restricted");

router.get("/", async (req, res, next) => {
  try {
    const users = await findAll()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      message: "Server error fulfilling request"
    })
  }
})

router.get("/:id", async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const user = await findById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(401).json({
        message: `User with id '${id}' does not exist`
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error fulfilling request"
    })
  }
})

module.exports = router;