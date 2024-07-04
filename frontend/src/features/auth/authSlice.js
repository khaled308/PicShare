import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi, loginApi } from "../../api/authApi";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const registerService = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await registerApi(data);
      return response;
    } catch (err) {
      const message =
        err.errors?.map((error) => error.message).join(", ") || err.message;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginService = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi(data);
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
