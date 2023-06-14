import db from "./db.json" assert { type: "json" };
import userDatabase from "./utils.js";

// *** GET all users data ***
const fetchUsers = () => {
  try {
    return db.users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

// *** GET one user data ***
const fetchUser = (uid) => {
  try {
    const user = db.users.find((data) => data.id === uid);
    if (!user) {
      throw {
        status: 400,
        mmessage: `User ${newUser.name} data  doesn't exists`,
      };
    }
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//  *** POST one user data ***
const createUser = (newUser) => {
  try {
    const userExists =
      db.users.findIndex((data) => data.email === newUser.email) > -1;
    if (userExists) {
      throw {
        status: 400,
        mmessage: `User ${newUser.name} data already exists`,
      };
    }
    db.users.push(newUser);
    userDatabase.saveToDatabase(db);
    return newUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// ***  DELETE one user data ***
const deleteUser = (uid) => {
  try {
    const findUserDataIndex = db.users.findIndex((data) => data.id === uid);
    db.users.splice(findUserDataIndex, 1);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//  *** PATCH one user data ***
const updateUser = (uid, changes) => {
  try {
    const findUserDataIndex = db.users.findIndex((data) => data.id === uid);
    const userData = {
      ...db.users[findUserDataIndex],
      ...changes,
    };
    db.users[findUserDataIndex] = userData;
    userDatabase.saveToDatabase(db);
    return userData;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export default { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
