import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
      })
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      })
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getMe = createAsyncThunk('auth/loginUser', async () => {
  try {
    const { data } = await axios.get('/auth/me')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null
      state.token = null
      state.isLoading = false
      state.status = null
    },
  },
  extraReducers: {
    //Registration
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    //Login
    [loginUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    //check authorization
    [getMe.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = null
      state.user = action.payload?.user
      state.token = action.payload?.token
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
  },
})

export const checkAuth = (state) => Boolean(state.auth.token)
export const { logOut } = authSlice.actions
export default authSlice.reducer
