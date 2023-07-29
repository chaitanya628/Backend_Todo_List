const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//connect with DB
mongoose.set("strictQuery", true);
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
