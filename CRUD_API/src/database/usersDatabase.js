import db from "./db.json" assert { type: "json" };
import userDatabase from "./utils.js";
const fetchUsers = () => {
  return db.users;
};

const createUser = (newUser) => {
  const userExists =
    db.users.findIndex((data) => data.userName === newUser.userName) > -1;
  if (userExists) return;
  db.users.push(newUser);
  userDatabase.saveToDatabase(db);
  return newUser;
};

const fetchUser = (uid) => {
  const user = db.users.find((data) => data.id === uid);
  if (!user) return null;
  return user;
};

const deleteUser = (uid) => {
  const findUserDataIndex = db.users.findIndex((data) => data.id === uid);
  db.users.splice(findUserDataIndex, 1);
};

const updateUser = (uid, changes) => {
  const findUserDataIndex = db.users.findIndex((data) => data.id === uid);
  const userData = {
    ...db.users[findUserDataIndex],
    ...changes,
    updateAt: new Date().toString("en-US", { timeZone: "UTC" }),
  };
  db.users[findUserDataIndex] = userData;
  userDatabase.saveToDatabase(db);
  return userData;
};

export default { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
