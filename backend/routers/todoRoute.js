import express from "express";
import todo from "../models/todoModel.js";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/:userId", getAllTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

export default router;
