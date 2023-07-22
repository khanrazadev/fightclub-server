import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

//get all the courses without lectures
router.route("/courses").get(getAllCourses);
//create course - only admin
router.route("/createcourse").post(createCourse);

export default router;
