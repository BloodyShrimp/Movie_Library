module.exports = function (sequelize, DataTypes) {
  var Movies = sequelize.define(
    "Movies",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Title cannot be empty",
        },
        notEmpty: {
          args: true,
          msg: "Title cannot be empty",
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 1,
            msg: "Score must be at least 1",
          },
          max: {
            args: 10,
            msg: "Score must be at most 10",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Type cannot be empty",
        },
        isIn: {
          args: [["movie", "series"]],
        },
      },
      episode: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.INTEGER,
      },
      startedDate: {
        type: DataTypes.DATEONLY,
      },
      finishedDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Status cannot be empty",
        },
        isIn: {
          args: [
            ["watching", "completed", "on-hold", "dropped", "plan-to-watch"],
          ],
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["title", "UserId"],
        },
      ],
    }
  );

  return Movies;
};
