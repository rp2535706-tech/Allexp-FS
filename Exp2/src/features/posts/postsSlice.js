import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Getting Started with Redux Toolkit",
      author: "Jane Doe",
      description:
        "Learn how Redux Toolkit simplifies Redux development and state management.",
      platform: "Dev.to",
      likes: 42,
      comments: 12,
      date: "Jul 30, 2026",
    },
    {
      id: 2,
      title: "React Performance Tips",
      author: "John Smith",
      description:
        "Optimize React apps with memoization, lazy loading, and code splitting.",
      platform: "Medium",
      likes: 31,
      comments: 8,
      date: "Jul 28, 2026",
    },
    {
      id: 3,
      title: "Mastering CSS Grid",
      author: "Emily Davis",
      description:
        "Build responsive layouts easily using modern CSS Grid features.",
      platform: "Hashnode",
      likes: 56,
      comments: 17,
      date: "Jul 25, 2026",
    },
    {
      id: 4,
      title: "JavaScript ES2025 Features",
      author: "Alex Brown",
      description:
        "Explore the newest JavaScript features with practical examples.",
      platform: "FreeCodeCamp",
      likes: 24,
      comments: 5,
      date: "Jul 20, 2026",
    },
  ],

  selectedPlatform: "All",
  search: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          ...action.payload,
        };
      }
    },

    likePost: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.likes += 1;
      }
    },

    addComment: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.comments += 1;
      }
    },

    setPlatformFilter: (state, action) => {
      state.selectedPlatform = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
  likePost,
  addComment,
  setPlatformFilter,
  setSearch,
} = postsSlice.actions;

export default postsSlice.reducer;
