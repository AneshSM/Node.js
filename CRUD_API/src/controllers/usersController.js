import apiService from "../services/usersService.js";

const fetchUsers = (req, res) => {
  const allUsers = apiService.fetchUsers();
  res.send({ status: "OK", data: allUsers });
};

const createUser = (req, res) => {
  const { body } = req;
  if (!body.userName | !body.name | !body.age | !body.phoneNo) return;

  const newUser = {
    userName: body.userName,
    name: body.name,
    age: body.age,
    phoneNo: body.phoneNo,
  };

  const createUser = apiService.createUser(newUser);
  res.status(201).send({ status: "OK", data: createUser });
};

const fetchUser = (req, res) => {
  const {
    params: { uid },
  } = req;
  if (!uid) return;
  const UserData = apiService.fetchUser(uid);
  res.status(201).send({ status: "OK", data: UserData });
};

const deleteUser = (req, res) => {
  const {
    params: { uid },
  } = req;
  if (!uid) return;
  apiService.deleteUser(uid);
  res.status(201).send({ status: "OK", data: "User deleted successfully" });
};

const updateUser = (req, res) => {
  const {
    params: { uid },
    body,
  } = req;
  const updateOneUser = apiService.updateUser(uid, body);
};

export { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
