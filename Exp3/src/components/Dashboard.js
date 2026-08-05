import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token));

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "JWT Authentication",
      content: "JWT is used for secure authentication in web applications.",
    },
    {
      id: 2,
      title: "Role Based Access Control",
      content: "RBAC restricts access based on user roles like Admin, Editor and Viewer.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addOrUpdatePost = () => {
    if (title === "" || content === "") {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      const updated = posts.map((post) =>
        post.id === editingId
          ? { ...post, title, content }
          : post
      );

      setPosts(updated);
      setEditingId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
      };

      setPosts([...posts, newPost]);
    }

    setTitle("");
    setContent("");
  };

  const editPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div style={{ width: "70%", margin: "30px auto" }}>
      <h2>React JWT Blog</h2>

      <h3>Welcome, {user.id}</h3>

      <h4>Role : {user.role}</h4>

      <button
        onClick={logout}
        style={{
          background: "red",
          color: "white",
          padding: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <hr />

      {(user.role === "Admin" || user.role === "Editor") && (
        <>
          <h3>{editingId ? "Update Post" : "Add New Post"}</h3>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />

          <br />
          <br />

          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />

          <br />
          <br />

          <button
            onClick={addOrUpdatePost}
            style={{
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Post" : "Add Post"}
          </button>

          <hr />
        </>
      )}

      <h2>Posts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          {(user.role === "Admin" || user.role === "Editor") && (
            <button
              onClick={() => editPost(post)}
              style={{
                marginRight: "10px",
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          )}

          {user.role === "Admin" && (
            <button
              onClick={() => deletePost(post.id)}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;