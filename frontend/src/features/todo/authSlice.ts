import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, authState } from "../../types/User";
import axios from "axios";

const baseURL = "http://localhost:5000/";
const initialState: authState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

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
