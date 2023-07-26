var mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    category: String,
    dueDate: Date,
    status: Boolean,
  },
  {
    timestamps: true,
  }
);
const todo = mongoose.model("ToDo", todoSchema);

module.exports = todo;
