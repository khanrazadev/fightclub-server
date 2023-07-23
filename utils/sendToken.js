// Sends the JWT token to the client as a cookie and responds with a JSON containing success status, a message, and user details.
export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
