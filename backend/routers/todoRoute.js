import express from "express";
import todo from "../models/todoModel.js";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
  updateTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/", getAllTodo);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

export default router;
