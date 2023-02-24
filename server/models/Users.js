module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Username cannot be empty",
      },
      unique: {
        args: true,
        msg: "Username already exists",
      },
      len: {
        args: [3, 20],
        msg: "Username must be between 3 and 20 characters long",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Email cannot be empty",
      },
      unique: {
        args: true,
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          msg: "Email is not valid",
        },
      },
      notEmpty: {
        args: true,
        msg: "Email cannot be empty",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Password cannot be empty",
      },
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Movies, {
      onDelete: "cascade",
    });
  };

  return Users;
};
