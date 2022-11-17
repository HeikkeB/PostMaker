import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
}

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    [createPost.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default postSlice.reducer
