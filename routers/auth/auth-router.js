const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  add,
  findBy
} = require("../../models/users-model");

router.post("/register", async (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await add(user);
    res.status(201).json(saved);
  } catch (err) {
    next({
      apiCode: 500,
      apiMessage: "error registering",
      ...err
    })
  }
})

router.post("/login", async (req, res, next) => {
  let {
    username,
    password
  } = req.body;

  const user = await findBy({
    username
  }).first();
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({
        message: `Welcome, ${user.username}, you're logged in!`
      })
    } else {
      next({
        apiCode: 401,
        apiMessage: "Invalid credentials"
      });
    }
  } catch (err) {
    next({
      apiCode: 500,
      apiMessage: "Server error while loggin in",
      ...err
    });
  }
})

router.get("/logout", async (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next({
          apiCode: 400,
          apiMessage: "There was an error logging out",
          ...err
        });
      } else {
        res.send("Successfully logged out")
      }
    })
  } else {
    res.send("You are not logged in")
  }
})

module.exports = router;