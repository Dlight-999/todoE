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

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData: { email: string; password: string }) => {
    const response = await axios.post(`${baseURL}api/user/signup`, formData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: { email: string; password: string }) => {
    const response = await axios.post(`${baseURL}api/user/login`, formData);
    return response.data;
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
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "Succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to sign up";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = "Succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed to login";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
