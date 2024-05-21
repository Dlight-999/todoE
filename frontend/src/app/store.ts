import { configureStore } from "@reduxjs/toolkit";
import todoSlices from "../features/todo/todoSlices";

export const store = configureStore({
  reducer: {
    todo: todoSlices,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
