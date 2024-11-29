import Admin from "../models/admin.model.js";

//Sign in Controller
export const signin = async (req, res, next) => {
  // res.json({ message: "welcome admin" });
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password || username === "" || password == null) {
    return next(errorHandler(400, "All fields are required!"));
  }
  try {
    const validUser = await Admin.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    if (password !== validUser.password) {
      return next(errorHandler(400, "Invalid credentials!"));
    }

    res.json({
      message: "User authenticated successfully",
      user: validUser,
    });
  } catch (error) {
    next(error);
  }
};
