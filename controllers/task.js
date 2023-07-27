const taskModel = require("../models/task");

module.exports = {
  addToDo: async (req, res) => {
    const { title, description, category, dueDate, status } = req.body;

    if (!title || !description || !category || !dueDate) {
      return res.status(400).json({
        error:
          "Please provide all required fields: title, description, category, dueDate",
      });
    }
    let createToDo = await taskModel.create({
      title: title,
      description: description,
      category: category,
      dueDate: dueDate,
      status: status,
      userId: req.userId,
    });
    res.status(200).send({
      code: 200,
      message: "To-do item added successfully",
      result: createToDo,
    });
  },

  updateToDo: async (req, res) => {
    const toDoResult = await taskModel.findOne({ _id: req.params.id });
    if (!toDoResult) {
      res.status(404).send({ code: 404, message: "To do item does not exist" });
    } else {
      const updateResult = await taskModel.findByIdAndUpdate(
        toDoResult._id,
        req.body,
        { new: true }
      );
      res.status(200).send({
        code: 200,
        message: "To-do item updated successfully",
        result: updateResult,
      });
    }
  },

  deleteToDo: async (req, res) => {
    const toDoResult = await taskModel.findOne({ _id: req.params.id });
    if (!toDoResult) {
      res.status(404).send({ code: 404, message: "To do item does not exist" });
    } else {
      await taskModel.findByIdAndDelete(toDoResult._id);
      res.status(200).send({
        code: 200,
        message: "To-do item deleted successfully",
        result: {},
      });
    }
  },

  toDoList: async (req, res) => {
    const toDoResult = await taskModel.find({ userId: req.userId });
    if (toDoResult.length == 0) {
      res.send({
        code: 404,
        message: "To do items does not exist",
        result: [],
      });
    } else {
      res.status(200).send({
        code: 200,
        message: "To-do items fetched successfully",
        result: toDoResult,
      });
    }
  },
};
