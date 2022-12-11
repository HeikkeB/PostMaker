/* eslint-disable semi */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/register', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/login', {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    })
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    })
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    })
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    })
  },
})

export const checkAuth = (state) => Boolean(state.auth.token);
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
