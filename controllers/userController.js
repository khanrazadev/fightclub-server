import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const file = req.file;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exist"), 409);

  //upload file on cloudnary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempUrl",
    },
  });

  sendToken(res, user, "Registered succesfully", 201);
});
