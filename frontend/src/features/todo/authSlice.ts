import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, authState } from "../../types/User";
import axios from "axios";
import { RootState } from "../../app/store";

const baseURL = "http://localhost:5000/";
const initialState: authState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const selectUser = (state: RootState) => state.auth.user;

// Thunk for signing up a user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    formData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseURL}api/users/signup`, formData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors[0].msg);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    formData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseURL}api/users/login`, formData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors[0].msg);
      }
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup User
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "Succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(signupUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to sign up";
        }
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "Succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to login";
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
