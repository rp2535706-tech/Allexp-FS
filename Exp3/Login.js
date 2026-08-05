import { useState } from "react";
import { users } from "../users";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.id === id && u.password === password
    );

    if (user) {
      const token = btoa(
        JSON.stringify({
          id: user.id,
          role: user.role,
        })
      );

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 JWT Authentication System</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;