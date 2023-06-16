const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users_controller");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:uuid", getUser);
router.delete("/:uuid", deleteUser);
router.put("/:uuid", updateUser);

module.exports = router;
