const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const MoviesRouter = require("./routes/Movies");
app.use("/movies", MoviesRouter);
const UsersRouter = require("./routes/Users");
app.use("/users", UsersRouter);

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
});
