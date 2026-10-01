import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [text, setText] = useState("");

  const count = text.length;
  const overLimit = count > 100;
  const empty = text.trim() === "";

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        fontFamily: "Arial",
        padding: "20px",
        border: "1px solid #ccc"
      }}
    >
      <h1>Post Box</h1>

      <textarea
        rows="8"
        style={{ width: "100%", boxSizing: "border-box" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your post..."
      />

      <p>{count} / 100</p>

      {overLimit && (
        <p style={{ color: "red" }}>Limit exceeded</p>
      )}

      <button disabled={empty || overLimit}>
        Post
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
