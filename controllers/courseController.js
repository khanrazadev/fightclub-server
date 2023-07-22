import { Course } from "../models/Course.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
export const getAllCourses = catchAsyncError(async (req, res, nxt) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});
export const createCourse = catchAsyncError(async (req, res, nxt) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return nxt(new ErrorHandler("Please add all fields", 400));
  // const file = req.file;

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });
  res.status(201).json({
    success: true,
    message: "Course created successfully!",
  });
});
