import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  addPost,
  deletePost,
  postsSelectors,
} from "../features/posts/postsSlice";

import { selectShortPosts } from "../features/posts/postsSelectors";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelectors.selectAll);
  const shortPosts = useSelector(selectShortPosts);

  const loading = useSelector((state) => state.posts.loading);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAdd = () => {
    if (title && body) {
      dispatch(
        addPost({
          id: Date.now(),
          title,
          body,
        })
      );

      setTitle("");
      setBody("");
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAdd}>Add Post</button>

      <hr />

      {loading && <h3>Loading...</h3>}

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>

          <p>{post.body}</p>

          <button onClick={() => dispatch(deletePost(post.id))}>
            Delete
          </button>

          <hr />
        </div>
      ))}

      <h2>Short Posts (Memoized Selector)</h2>

      <p>Total Short Posts: {shortPosts.length}</p>
    </div>
  );
}

export default Posts;