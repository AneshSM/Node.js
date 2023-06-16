const { User } = require("../models");

const createUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const users = await User.create({ name, role, email });
    res
      .status(200)
      .send({ status: "OK", message: "User has been created", data: users });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res
      .status(200)
      .send({ status: "OK", message: "all User data", data: users });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

const getUser = async (req, res) => {
  try {
    const {
      params: { uuid },
    } = req;
    const user = await User.findOne({ where: { uuid }, include: "posts" });
    res.status(200).send({ status: "OK", message: "User data", data: user });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      params: { uuid },
    } = req;
    await User.destroy({ where: { uuid } });
    res.status(200).send({ status: "OK", message: "User deleted" });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};
const updateUser = async (req, res) => {
  try {
    let {
      params: { uuid },
      body: { name, email, role },
    } = req;
    const user = await User.findOne({ where: { uuid } });
    await User.update({ name, email, role }, { where: { uuid } });
    res.status(200).send({ status: "OK", message: "User data updated" });
  } catch (error) {
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

module.exports = { createUser, getUsers, getUser, deleteUser, updateUser };
