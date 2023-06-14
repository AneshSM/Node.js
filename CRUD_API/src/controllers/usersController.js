import apiService from "../services/usersService.js";

const fetchUsers = (req, res) => {
  try {
    const allUsers = apiService.fetchUsers();
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res.send({ status: "FAILED", data: { error: error?.meggage || error } });
  }
};

const createUser = (req, res) => {
  const { body } = req;
  if (
    !body.email |
    !body.name |
    !body.gender |
    !body.password |
    !body.dateOfBirth
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'email', 'name','gender', 'age', 'phoneNo','password",
      },
    });
    return;
  }

  const newUser = {
    email: body.email,
    name: body.name,
    age: body.age,
    phoneNo: body.phoneNo,
  };

  try {
    const createUser = apiService.createUser(newUser);
    res.status(201).send({ status: "OK", data: createUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const fetchUser = (req, res) => {
  const {
    params: { uid },
  } = req;
  if (!uid) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
    return;
  }
  try {
    const UserData = apiService.fetchUser(uid);
    res.status(201).send({ status: "OK", data: UserData });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: error?.message || error });
  }
};

const deleteUser = (req, res) => {
  const {
    params: { uid },
  } = req;
  if (!uid) {
    res.status(400).status({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
    return;
  }
  try {
    apiService.deleteUser(uid);
    res.status(201).send({ status: "OK", data: "User deleted successfully" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: error?.message || error });
  }
};

const updateUser = (req, res) => {
  const {
    params: { uid },
    body,
  } = req;
  if (!uid) {
    res.status(400).status({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
    return;
  }
  // if (!body) {
  //   res.status(400).status({
  //     status: "FAILED",
  //     data: { error: "Parameter ':workoutId' can not be empty" },
  //   });
  //   return;
  // }
  try {
    const updateOneUser = apiService.updateUser(uid, body);
    res.status(201).send({ status: "OK", data: updateOneUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: error?.message || error });
  }
};

export { fetchUsers, createUser, fetchUser, deleteUser, updateUser };
