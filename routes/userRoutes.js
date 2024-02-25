import express from "express";
import * as userController from "../controllers/userControllers.js"
const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.post("/send-email", userController.sendEmail);

export {router as userRoutes};