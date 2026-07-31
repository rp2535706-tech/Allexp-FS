export const selectPosts = (state) => state.posts.posts;

export const selectPlatform = (state) =>
  state.posts.selectedPlatform;

export const selectSearch = (state) =>
  state.posts.search;

export const selectFilteredPosts = (state) => {
  const posts = state.posts.posts;
  const platform = state.posts.selectedPlatform;
  const search = state.posts.search.toLowerCase();

  return posts.filter((post) => {
    const platformMatch =
      platform === "All" || post.platform === platform;

    const searchMatch =
      post.title.toLowerCase().includes(search) ||
      post.author.toLowerCase().includes(search) ||
      post.description.toLowerCase().includes(search);

    return platformMatch && searchMatch;
  });
};
