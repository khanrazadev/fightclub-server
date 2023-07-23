import express from "express";
import {
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

//to register a new user
router.route("/register").post(register);

//login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

//change password
router.route("/changepassword").put(isAuthenticated, changePassword);

//updateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//updateProfile
router.route("/forgetpassword").post(forgetPassword);

//updateProfile
router.route("/resetpassword/:token").put(resetPassword);

export default router;
