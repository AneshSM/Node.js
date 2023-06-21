const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/user_controller");
const user_router = express.Router();

user_router.get("/", getUsers);
user_router.get("/:uid", getUser);
user_router.post("/", createUser);
user_router.delete("/:uid", deleteUser);
user_router.put("/:uid", updateUser);

module.exports = user_router;
