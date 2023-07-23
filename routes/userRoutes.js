import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
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

//forgetpassword
router.route("/forgetpassword").post(forgetPassword);

//resetpassword
router.route("/resetpassword/:token").put(resetPassword);

//Add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
//remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

export default router;
