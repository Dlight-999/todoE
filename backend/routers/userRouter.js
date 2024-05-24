import express from "express";
import { loginUser, signupUser } from "../controller/userController.js";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validationMiddleware.js";
const router = express.Router();

//login Route
router.post("/login", validateLogin, loginUser);
//signup route
router.post("/signup", validateSignup, signupUser);
export default router;
