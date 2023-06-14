const express = require("express");
const {
  getData,
  putData,
  deleteData,
  updateData,
  getAllData,
} = require("../controllers");

const router = express.Router();

router.get("/", getAllData);
router.get("/:todo_id", getData);
router.post("/", putData);
router.delete("/", deleteData);
router.patch("/", updateData);

module.exports = router;
