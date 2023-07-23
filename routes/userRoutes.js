import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";

const router = express.Router();
//to register a new user
router.route("/register").post(register);
//login
router.route("/login").post(login);
//logout
router.route("/logout").get(logout);
//get my profile
router.route("/me").get(getMyProfile);

export default router;
