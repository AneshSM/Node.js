import { v4 as uuidv4 } from "uuid";
import usersDatabase from "../database/usersDatabase.js";

const fetchUsers = () => {
  try {
    const users = usersDatabase.fetchUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

const createUser = (newUser) => {
  const userData = {
    ...newUser,
    id: uuidv4(),
  };

  try {
    const createdUser = usersDatabase.createUser(userData);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const fetchUser = (uid) => {
  try {
    const userData = usersDatabase.fetchUser(uid);
    return userData;
  } catch (error) {
    throw error;
  }
};

const deleteUser = (uid) => {
  try {
    usersDatabase.deleteUser(uid);
  } catch (error) {
    throw error;
  }
};

const updateUser = (uid, changes) => {
  try {
    return usersDatabase.updateUser(uid, changes);
  } catch (error) {
    throw error;
  }
};

export default { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
