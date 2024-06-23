import { Router } from "express";
import {
  getAllUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";
import { validateUser } from "../middleWares/users.middleware.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getSpecificUser);

router.post("/", validateUser, createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
