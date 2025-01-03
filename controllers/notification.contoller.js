import Email from "../models/email.model.js";
import { errorHandler } from "../utils/error.js";

export const notification = async (req, res, next) => {
  console.log("createNotification");
  res.send([
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Don't forget to check your tasks!" }
  ]);
  
};
