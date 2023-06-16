const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = new Sequelize(
  "sequelize_sample_2",
  "postgres",
  "AnePsql204",
  {
    dialect: "postgres",
  }
);

// const connect = async () =>
//   sequelize.authenticate().then(() => console.log("Connection successful"));

// connect();

const user = sequelize.define(
  "users",
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  },
  {
    timestamps: false,
  }
);

user.sync({ force: true }).catch((err) => console.log(err));
