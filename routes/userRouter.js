import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const createUserRouter = ({ userModel }) => {
  const router = Router();
  const userController = new UserController({ userModel });

  router.post("/register", userController.createUser);
  router.get("/users", userController.getUsers);
  router.get("/users/:userId", userController.getUserById);
  router.patch("/users/:userId", userController.updateUser);
  router.delete("/users/:userId", userController.deleteUser);

  return router;
};
