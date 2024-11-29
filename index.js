import express from "express";
const app = express();
import adminRoute from "./routes/admin.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post.route.js";

dotenv.config();

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



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    success: false,
    statusCode,
    message,
  });
});
