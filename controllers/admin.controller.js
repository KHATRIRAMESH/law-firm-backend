import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//Sign in Controller
export const signin = async (req, res, next) => {
  // res.json({ message: "welcome admin" });
  console.log(req.body);
  const { username, password } = req.body;
  // console.log(username, password);

  if (!username || !password) {
    return next(errorHandler(400, "All fields are required!"));
  }
  console.log(username, password);
  try {
    const validUser = await Admin.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    console.log("user found")

    if (password !== validUser.password) {
      return next(errorHandler(400, "Invalid credentials!"));
    }
    console.log(`password matched`)

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error)
    next(error);
  }
};


export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
  console.log("updateUser",req.body)
  // if (req.user._id !== req.params.userId) {
  //   return next(errorHandler(401, "Unauthorized"));
  // }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters long")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username must contain only letters and numbers")
      );
    }
  }
console.log(`updating..`)
  try {
    const updatedUser = await Admin.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
         
          // profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
    console.log(`updated successfully`)
  } catch (error) {
    next(error);
  }
};