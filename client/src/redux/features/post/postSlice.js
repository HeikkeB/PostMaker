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

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',

  async () => {
    try {
      const { data } = await axios.get('/posts')
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
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    })
    builder.addCase(createPost.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload.posts
      state.popularPosts = action.payload.popularPosts
    })
    builder.addCase(getAllPosts.rejected, (state) => {
      state.loading = false
    })
  },
  // extraReducers: {
  //   [createPost.pending]: (state) => {
  //     state.loading = true
  //   },
  //   [createPost.fulfilled]: (state, action) => {
  //     state.loading = false
  //     state.posts.push(action.payload)
  //   },
  //   [createPost.rejected]: (state) => {
  //     state.loading = false
  //   },
  //   [getAllPosts.pending]: (state) => {
  //     state.loading = true
  //   },
  //   [getAllPosts.fulfilled]: (state, action) => {
  //     state.loading = false
  //     state.posts = action.payload.posts
  //     state.popularPosts = action.payload.popularPosts
  //   },
  //   [getAllPosts.rejected]: (state) => {
  //     state.loading = false
  //   },
  //  },
})

export default postSlice.reducer
