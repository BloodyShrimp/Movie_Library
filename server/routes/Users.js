const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// Registration
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
    })
      .then((result) => {
        return res.json("User created");
      })
      .catch((err) => {
        return res.json(err.message);
      });
  });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.json({ error: "User not found" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const accessToken = sign(
      { username: user.username, userId: user.id },
      "secret"
    );

    return res.json({
      token: accessToken,
      username: username,
      userId: user.id,
    });
  });
});

// Check if user is logged in
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// // Get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  res.json(user);
});

// Delete user by id
router.delete("/:id", validateToken, async (req, res) => {
  const userId = req.params.id;
  await Users.destroy({
    where: {
      id: userId,
    },
  });
  res.json("User deleted");
});

module.exports = router;
