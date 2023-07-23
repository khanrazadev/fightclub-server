import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exists", 409));

  // Create the user with default avatar values
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempUrl",
    },
  });

  // Send token in response upon successful registration
  sendToken(res, user, "Registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  // Find the user by email (selecting password field)
  const user = await User.findOne({ email }).select("+password");

  // Check if the user exists
  if (!user) return next(new ErrorHandler("Incorrect email or password", 401));

  const isMatched = await user.comparePassword(password);
  if (!isMatched)
    return next(new ErrorHandler("Incorrect email or password", 401));

  // Send token in response upon successful login
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  // Find the user by their ID (assuming it's stored in req.user._id)
  const user = User.findById(req.user._id);

  // Return the user's profile in the response
  res.status(200).json({
    success: true,
    user,
  });
});
