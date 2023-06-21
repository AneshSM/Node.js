const fs = require("fs");
const path = require("path");

const { env } = require("node:process");
const { Sequelize } = require("sequelize");

const basename = path.basename(__filename);
const enviornment = env.NODE_ENV || "dev";

const config = require(__dirname + "/../config/config.json")[enviornment];

const { username, password, database, dialect } = config;
const sequelize = new Sequelize(database, username, password, config, {
  dialect,
});

let db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
module.exports = db;

// sequelize.sync().then(() => console.log("Database synced successfully"));
