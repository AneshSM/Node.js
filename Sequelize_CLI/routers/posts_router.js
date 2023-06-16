const express = require("express");
const {
  createPost,
  getPost,
  getPosts,
} = require("../controllers/posts_controller");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:uuid", getPost);

module.exports = router;
