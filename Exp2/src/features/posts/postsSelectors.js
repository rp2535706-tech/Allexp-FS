import { createSelector } from "reselect";

const selectPosts = (state) => state.posts.entities;

export const selectShortPosts = createSelector(
  [selectPosts],
  (posts) =>
    Object.values(posts).filter(
      (post) => post && post.body.length < 100
    )
);