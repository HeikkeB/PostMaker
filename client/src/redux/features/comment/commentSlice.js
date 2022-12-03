/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId) => {
    try {
      const { data } = await axios.get(`posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    })
    builder.addCase(createComment.rejected, (state) => {
      state.loading = false;
    }) 
    builder.addCase(getPostComments.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
    builder.addCase(getPostComments.rejected, (state) => {
      state.loading = false;
    }) 
  },

});

export default commentSlice.reducer;
