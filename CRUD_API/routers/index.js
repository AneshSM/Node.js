import express from "express";
import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  updateUser,
} from "../controllers/users.js";

export const router = express.Router();

router.get("/", fetchUsers);

router.get("/:id", fetchUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);
