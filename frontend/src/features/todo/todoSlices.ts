import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../../types/Todo";
import axios from "axios";

//get Todo
const baseURL = "http://localhost:5000/";
export const getTodo = createAsyncThunk(
  "todo/getTodo",
  async (userID: string) => {
    const response = await axios.get<Todo[]>(`${baseURL}api/todo/${userID}`);
    return response.data;
  }
);

//Add Todo
export const addTodo = createAsyncThunk<
  Todo,
  Omit<Todo, "_id" | "createdAt" | "updatedAt">
>("todo/addTodo", async (data) => {
  const response = await axios.post<Todo>(`${baseURL}api/todo`, data);
  return response.data;
});

//Update Todo
export const updateTodo = createAsyncThunk<
  Todo,
  { _id: string; data: Partial<Todo> }
>("todo/updateTodo", async ({ _id, data }) => {
  const response = await axios.patch<Todo>(`${baseURL}api/todo/${_id}`, data);
  return response.data;
});

//Delete Todo
export const deleteTodo = createAsyncThunk<{ _id: string }, string>(
  "todo/deleteTodo",
  async (_id) => {
    await axios.delete(`${baseURL}api/todo/${_id}`);
    return { _id };
  }
);

const initialState: TodoState = {
  todo: [],
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodo.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "idle";
        state.todo = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todo.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todo = state.todo.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<{ _id: string }>) => {
          state.todo = state.todo.filter(
            (todo) => todo._id !== action.payload._id
          );
        }
      );
  },
});

export default todoSlice.reducer;
