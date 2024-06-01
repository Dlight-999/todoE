import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const todo = mongoose.model("todo", todoSchema);
export default todo;
