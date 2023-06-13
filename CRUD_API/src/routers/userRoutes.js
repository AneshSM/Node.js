import express from "express";
import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  updateUser,
} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/", fetchUsers);

userRouter.get("/:uid", fetchUser);

userRouter.post("/", createUser);

userRouter.delete("/:uid", deleteUser);

userRouter.patch("/:uid", updateUser);

export default userRouter;
