import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // ✅ ADMIN LOGIN
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");   // ✅ STEP-1
      navigate("/admin");
      return;
    }

    // ✅ CUSTOMER LOGIN
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("❌ No user found. Please signup first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (
      email.trim() === user.email &&
      password.trim() === user.password
    ) {
      localStorage.setItem("role", "customer");
      localStorage.setItem("email", user.email); // ✅ ADD THIS
      navigate("/customer");

    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h2 style={styles.title}>Login</h2>

        {/* Dummy hidden inputs to trick browser autofill */}
        <input type="text" name="prevent_autofill" style={{ display: "none" }} tabIndex="-1" />
        <input type="password" name="password_prevent_autofill" style={{ display: "none" }} tabIndex="-1" />

        <input
          type="email"
          name="user_email_identity"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="new-password"
        />

        <input
          type="password"
          name="user_password_private"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="new-password"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          Don’t have an account?
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1, #ec4899)"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "14px",
    width: "360px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  text: {
    marginTop: "15px",
    textAlign: "center"
  },
  link: {
    marginLeft: "6px",
    color: "#6366f1",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Login;
