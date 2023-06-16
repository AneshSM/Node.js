const { User, Post } = require("../models");

const createPost = async (req, res) => {
  const { body, userUUID } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUUID } });
    const post = await Post.create({ body, userId: user.id });
    console.log(post);
    res
      .status(200)
      .send({ status: "OK", message: "Post has been created for", data: user });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res
      .status(200)
      .send({ status: "OK", message: "all Post data", data: posts });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

const getPost = async (req, res) => {
  try {
    const {
      params: { uuid },
    } = req;
    const user = await User.findOne({ where: { uuid } });
    res.status(200).send({ status: "OK", message: "User data", data: user });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

module.exports = { createPost, getPosts, getPost };
