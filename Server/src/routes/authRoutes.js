import express from "express";
import { signUp, login, logout } from "../controllers/authController.js";
import { validateUser } from "../middlewares/JoiValidation/userValidation.js";

const router = express.Router();

router.post("/register", validateUser, signUp);
router.post("/logout", logout);
router.post("/login", login);

export default router;
