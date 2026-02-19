import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

    if (!name || !email || !password) {
      setError("❌ All fields are required");
      return;
    }

    // ✅ Save customer details in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: "customer"
      })
    );
    localStorage.setItem("email", email); // Store email for persistent session

    alert("✅ Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        <h2 style={styles.title}>📝 Customer Signup</h2>

        {/* Dummy hidden inputs to trick browser autofill */}
        <input type="text" name="ignore_name" style={{ display: "none" }} tabIndex="-1" />
        <input type="email" name="ignore_email" style={{ display: "none" }} tabIndex="-1" />
        <input type="password" name="ignore_password" style={{ display: "none" }} tabIndex="-1" />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="new-password"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleSignup} style={styles.button}>
          Register ✅
        </button>

        <p style={styles.text}>
          Already have an account?
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
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
    background: "linear-gradient(135deg, #bbf7d0, #86efac)" // 💚 light green
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    width: "380px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#166534"
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
    background: "#22c55e",
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
    color: "#16a34a",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Signup;
