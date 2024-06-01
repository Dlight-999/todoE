import mongoose from "mongoose";
import Todo from "../models/todoModel.js";

// Get all todos
const getAllTodo = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { task, description, user_id } = req.body;
  try {
    const todo = await Todo.create({ task, description, user_id });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createTodo, getAllTodo, deleteTodo, updateTodo };
