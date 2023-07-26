const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors");

// const DB_URL="mongodb://localhost:27017/";
const DB_URL =
  "mongodb+srv://user:oOfVg4w3uyv2At6E@cluster0.elwsnav.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(cors());

//connect with DB
mongoose.connect(DB_URL, { dbName: "todo" }, (err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log(err);
  }
});
// Import the task.js route
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

// Use the task.js route
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
