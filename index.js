import express from "express";
import adminRoute from "./routes/admin.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post.route.js";
import emailRoute from "./routes/email.route.js";
import fileRoute from "./routes/file.route.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

//mongoose connect
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log(" MongoDB is Connected!"))
  .catch((err) => console.log(err));

// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Enable CORS for the server to accept requests from your frontend
// const allowList=["http://localhost:5173"]
const corsOptions = {
  origin: "http://localhost:5173" || "*",
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware to enable cross-origin requests from your frontend
app.use(cors(corsOptions));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Create a route that sends a response when visiting the homepage
app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

//admin route
app.use("/api/admin", adminRoute);

//blog route
app.use("/api/post", postRoute);

//email route
app.use("/api/user", emailRoute);

//photo upload route
app.use("/api/upload", fileRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log(`error checking`, statusCode, message);
  console.log(`response`,res)
  const response = res.status(404).json({
    message: message,
    success: false,
    statusCode: statusCode,
  });
  // console.log(`error responded with status`, response.message,response.statusCode);
});
