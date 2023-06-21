const { users } = require("../models");
const getUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    res.status(200).send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", error: error?.message || error });
  }
};

const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    try {
      const userData = await users.findAll({ where: { uid } });
      res.status(200).send({ status: "OK", data: userData });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "ERROR", error: error?.message || error });
    }
  } catch (error) {
    res
      .status(error?.status || 400)
      .send({ status: "ERROR", error: error?.message || error });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, age, description } = req.body;
    try {
      const user = await users.create({ username, password, age, description });
      res.status(200).send({ status: "OK", data: user });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "ERROR",
        error: error?.errors[0].message || error?.message || error,
      });
    }
  } catch (error) {
    res
      .status(error?.status || 400)
      .send({ status: "ERROR", error: error?.message || error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    try {
      const deleteStatus = await users.destroy({ where: { uid } });
      if (deleteStatus === 0) {
        res.status(400).send({
          status: "ERROR",
          msg: `no user exist with the id:${uid} to delete `,
        });
      } else {
        res.status(200).send({
          status: "OK",
          msg: "User data have been deleted successfully",
        });
      }
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "ERROR",
        error: error?.errors[0].message || error?.message || error,
      });
    }
  } catch (error) {
    res
      .status(error?.status || 400)
      .send({ status: "ERROR", error: error?.message || error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    let { age } = req.body;
    try {
      const updateStatus = await users.update({ age: age }, { where: { uid } });
      res.status(200).send({ status: "OK", data: updateStatus });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "ERROR",
        msg: error?.message || error,
        error,
      });
    }
  } catch (error) {
    res
      .status(error?.status || 400)
      .send({ status: "ERROR", msg: error?.message || error });
  }
};

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
