import Notification from "../models/email.model.js";
import { errorHandler } from "../utils/error.js";

export const createNotification = async (req, res, next) => {
  // console.log("createNotification");

  // if (req.method === "GET") {
  //   //TODO:handle notification events sent to the admin
  //   res.setHeader("Content-Type", "text/event-stream");
  //   res.setHeader("Cache-Control", "no-cache");
  //   res.setHeader("Connection", "keep-alive");

  //   res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);

  //   setTimeout(() => {
  //     const notification = { message: "New email from a user!" };
  //     res.write(`data: ${JSON.stringify(notification)}\n\n`);
  //   }, 5000);
  //   setTimeout(() => {
  //     const notification = { message: "New email from a user!" };
  //     res.write(`data: ${JSON.stringify(notification)}\n\n`);
  //   }, 5000);

  //   req.on("close", () => {
  //     console.log("SSE connection closed");
  //     res.end();
  //   });
  // } else {
  //   res.status(405).send("Method Not Allowed");
  // }
  res.send("<h1>Hello, Express.js Server!</h1>");
};
