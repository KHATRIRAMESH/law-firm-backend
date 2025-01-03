import Notification from "../models/email.model.js";
import { errorHandler } from "../utils/error.js";

export const createNotification = async (req, res, next) => {
  console.log("createNotification");

  // const { message } = req.body;
  // console.log(message);
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // res.write(`data: {"message": "Connected to SSE"}\n\n`);

    res.write(`data: ${JSON.stringify({ message: "Connected to SSE" })}\n\n`);

    setTimeout(() => {
      const notification = { message: "New email from a user!" };
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    }, 1000);

    req.on("close", () => {
      console.log("SSE connection closed");
      res.end();
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
