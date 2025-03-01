import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );
    const total = parseInt(response.headers["x-total-count"] || "100");

    return {
      posts: response.data,
      total,
    };
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      ),
    ]);

    return {
      ...postResponse.data,
      comments: commentsResponse.data,
    };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    currectPost: null,
    status: "idle",
    error: null,
    searchTerm: "",
    currentPage: 1,
    totalPost: 0,
    postPerPage: 10,
    filters: {
      userId: null,
    },
  },

  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currectPost = action.payload;
    },
    setfilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilter: (state) => {
      state.filters = { userId: null };
      state.searchTerm = "";
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.posts;
        state.totalPost = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currectPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setCurrentPage, setfilter, clearFilter } =
  postsSlice.actions;
export default postsSlice.reducer;