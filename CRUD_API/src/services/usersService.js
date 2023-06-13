import { v4 as uuidv4 } from "uuid";
import usersDatabase from "../database/usersDatabase.js";

const fetchUsers = () => {
  const users = usersDatabase.fetchUsers();
  return users;
};

const createUser = (newUser) => {
  const userData = {
    ...newUser,
    id: uuidv4(),
    createdAt: new Date().toString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toString("en-US", { timeZone: "UTC" }),
  };
  const createdUser = usersDatabase.createUser(userData);
  return createdUser;
};

const fetchUser = (uid) => {
  const userData = usersDatabase.fetchUser(uid);
  return userData;
};

const deleteUser = (uid) => {
  usersDatabase.deleteUser(uid);
};

const updateUser = (uid, changes) => {
  usersDatabase.updateUser(uid, changes);
};

export default { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
