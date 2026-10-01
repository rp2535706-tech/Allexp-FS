
import { useState } from "react";

function PostBox() {
  const [text, setText] = useState("");

  const count = text.length;
  const isOverLimit = count > 100;
  const isEmpty = text.trim() === "";

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Create Post</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your post..."
        rows="8"
        style={{ width: "100%" }}
      />

      <p>{count} / 100</p>

      {isOverLimit && (
        <p style={{ color: "red" }}>Limit exceeded</p>
      )}

      <button disabled={isEmpty || isOverLimit}>
        Post
      </button>
    </div>
  );
}

export default PostBox;
