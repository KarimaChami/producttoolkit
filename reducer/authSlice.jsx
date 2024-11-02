import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers", // Unique string to identify the action
  async () => {
    const response = await axios.get("http://localhost:5003/users"); // Adjust URL to your local JSON file path
    return response.data; // Return the fetched users
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Start with no user logged in
    users: [], // Store the fetched users here
    status: "idle", // Status of the fetch action
    isValid: false, // To check if user credentials are valid
    error: null, // To store error messages
  },
  reducers: {
    login: (state, action) => {
      // Check for admin credentials
      if (
        action.payload.email === "maryemjamri@gmail.com" &&
        action.payload.password === "admin123"
      ) {
        state.user = { email: action.payload.email, isAdmin: true };
        state.isValid = true;
      } else if (
        action.payload.email === action.payload.email &&
        action.payload.password === action.payload.password
      ) {
        // Assuming you want to check against fetched users (you may need to adjust this logic)
        const foundUser = state.users.find(
          (user) =>
            user.email === action.payload.email &&
            user.password === action.payload.password
        );
        if (foundUser) {
          state.user = { email: action.payload.email, isAdmin: false };
          state.isValid = true;
        }
      }
    },
    logout: (state) => {
      state.user = null; // Clear user on logout
      state.isValid = false; // Reset validation status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"; // Set status to loading when the fetch starts
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when fetch is successful
        state.users = action.payload; // Store the fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if there’s an error
        state.error = action.error.message; // Store the error message
      });
  },
});

export const { login, logout } = authSlice.actions; // Export actions for use in components
export default authSlice.reducer; // Export the reducer
