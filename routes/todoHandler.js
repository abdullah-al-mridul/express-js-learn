const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = mongoose.model("Todo", todoSchema);

//get all todos
router.get("/", async (req, res) => {
  await Todo.find({})
    .select({ _id: 0, __v: 0, date: 0 })
    .then((data) => {
      res.status(200).json({
        message: "Todos were fetched successfully",
        todo: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

// get a todo by id
router.get("/:id", async (req, res) => {
  await Todo.findById(req.params.id)
    .select({ _id: 0, __v: 0, date: 0 })
    .then((data) => {
      res.status(200).json({
        message: "Todo was fetched successfully",
        todo: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

// get active todos
// router.get("/active", async (req, res) => {
//   const todo = new Todo();
//   const data = await todo.findActive();
//   res.status(200).json({
//     message: "Active todos were fetched successfully",
//     todo: data,
//   });
// });

//post todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo
    .save()
    .then(() => {
      res.status(200).json({
        message: "Todo created successfully",
        todo: newTodo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was a server side error",
      });
    });
});

//post all todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then((data) => {
      res.status(200).json({
        message: "Todos were created successfully",
        todo: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

//put todo
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Todo updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

//delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a server side error ${err}`,
      });
    });
});

module.exports = router;
