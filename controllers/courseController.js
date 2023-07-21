import { Course } from "../models/Course.js";
export const getAllCourses = async (req, res, nxt) => {
  const courses = await Course.find();
  res.status(200).json({
    success: true,
    courses,
  });
};
