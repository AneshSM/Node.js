import { v4 as uuidv4 } from "uuid";

let users = [];

const fetchUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;
  users.push({ ...req.body, id: uuidv4() });
  res.send(`The user ${name} has been added`);
};

const fetchUser = (req, res) => {
  res.send(users.find((user) => user.id === req.params.id));
};

const deleteUser = (req, res) => {
  users = users.filter((data) => data.id !== req.params.id);
  res.send(`The use with id:$${req.params.id} has been deleted`);
};

const updateUser = (req, res) => {
  const { name, age, gender } = req.body;
  const user = users.find((data) => data.id === req.params.id);
  user.name = name ? name : user.name;
  user.age = age ? age : user.age;
  user.gender = gender ? gender : user.gender;
  res.send(`The user with id:${req.params.id} has been updated succesfully`);
};

export { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
