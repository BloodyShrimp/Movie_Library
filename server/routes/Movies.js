const express = require("express");
const router = express.Router();
const { Movies } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all movies
router.get("/", async (req, res) => {
  const listOfMovies = await Movies.findAll();
  return res.json(listOfMovies);
});

// Get movies by user and status
router.get("/private/:userId", validateToken, async (req, res) => {
  const userId = req.params.userId;
  const status = req.query.status;
  let whereClause = { UserId: userId };
  if (status) {
    whereClause.status = status;
  }
  const listOfMovies = await Movies.findAll({
    where: whereClause,
  });
  return res.json(listOfMovies);
});

// Get movie by id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movies.findByPk(id);
  return res.json(movie);
});

// Add new movie
router.post("/", validateToken, async (req, res) => {
  const movie = req.body;
  const userId = req.user.userId;
  movie.UserId = userId;

  await Movies.create(movie)
    .then((result) => {
      return res.json("Movie added successfully");
    })
    .catch((err) => {
      return res.json({ error: err.message });
    });
});

// Edit movie

router.patch("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  const userId = req.user.userId;

  try {
    const dbMovie = await Movies.findOne({ where: { id } });
    if (!dbMovie) {
      return res.json({ error: "Movie not found" });
    }

    if (dbMovie.UserId !== userId) {
      return res.json({
        error: `You are not authorized to edit this movie`,
      });
    }

    await Movies.update(movie, { where: { id: id, UserId: userId } });
    return res.json("Movie updated successfully");
  } catch (err) {
    return res.json({ error: err.message });
  }
});

// Delete movie
router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    const dbMovie = await Movies.findOne({ where: { id } });
    if (!dbMovie) {
      return res.json({ error: "Movie not found" });
    }

    if (dbMovie.UserId !== userId) {
      return res.json({ error: "You are not authorized to delete this movie" });
    }

    await Movies.destroy({ where: { id: id, UserId: userId } });
    return res.json("Movie deleted successfully");
  } catch (err) {
    return res.json({ error: err.message });
  }
});

module.exports = router;
