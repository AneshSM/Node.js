const express = require("express");
const {
  getData,
  putData,
  deleteData,
  updateData,
  getAllData,
} = require("../controllers");

const router = express.Router();

// *** express routes for CRUD ***

router.get("/", getAllData);
router.get("/:todo_id", getData);
router.post("/", putData);
router.delete("/:todo_id", deleteData);
router.patch("/:todo_id", updateData);

module.exports = router;
