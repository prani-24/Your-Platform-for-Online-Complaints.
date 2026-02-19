import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      {/* Decorative Blur Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div style={styles.left}>
        <div style={styles.badge}>🚀 System Active</div>
        <h1 style={styles.title}>
          Complaint <span style={styles.titleGradient}>Management</span> System
        </h1>
        <p style={styles.subtitle}>
          Empower your team and satisfy your customers with our robust,
          premium tracking and resolution platform.
        </p>

        <div style={styles.actionArea}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={styles.button}>
              Get Started
              <span style={styles.arrow}>→</span>
            </button>
          </Link>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.illustrationWrapper}>
          <div style={styles.mainCircle}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3126/3126647.png"
              alt="complaint-resolution"
              style={styles.heroLogo}
            />
          </div>
          <div style={styles.floatingCard1}>
            <span style={{ fontSize: "24px" }}>✅</span>
            <div>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}>Resolved</p>
              <p style={{ margin: 0, fontSize: "10px", opacity: 0.7 }}>2 mins ago</p>
            </div>
          </div>
          <div style={styles.floatingCard2}>
            <span style={{ fontSize: "24px" }}>⏳</span>
            <div>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}>Pending</p>
              <p style={{ margin: 0, fontSize: "10px", opacity: 0.7 }}>5 mins ago</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>© 2026 Premium CMS. Built with ❤️ for excellence.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10%",
    background: "radial-gradient(circle at top left, #4f46e5 0%, #1e1b4b 100%)",
    fontFamily: "'Inter', sans-serif",
    color: "white",
    overflow: "hidden",
    position: "relative",
  },
  orb1: {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: "400px",
    height: "400px",
    background: "rgba(124, 58, 237, 0.3)",
    filter: "blur(100px)",
    borderRadius: "50%",
    zIndex: 1,
  },
  orb2: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    width: "500px",
    height: "500px",
    background: "rgba(236, 72, 153, 0.2)",
    filter: "blur(120px)",
    borderRadius: "50%",
    zIndex: 1,
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    zIndex: 10,
    maxWidth: "600px",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    color: "#a78bfa",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1px",
    border: "1px solid rgba(167, 139, 250, 0.3)",
  },
  title: {
    fontSize: "68px",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: "0",
    letterSpacing: "-2px",
  },
  titleGradient: {
    background: "linear-gradient(to right, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "20px",
    color: "#94a3b8",
    lineHeight: "1.6",
  },
  actionArea: {
    marginTop: "20px",
  },
  button: {
    padding: "18px 40px",
    fontSize: "18px",
    fontWeight: "800",
    color: "white",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s",
    boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.5)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  arrow: {
    fontSize: "22px",
    transition: "transform 0.3s ease",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  illustrationWrapper: {
    position: "relative",
    width: "450px",
    height: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainCircle: {
    width: "350px",
    height: "350px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  heroLogo: {
    width: "200px",
    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
  },
  floatingCard1: {
    position: "absolute",
    top: "10%",
    right: "0",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    padding: "15px 25px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "float 6s ease-in-out infinite",
  },
  floatingCard2: {
    position: "absolute",
    bottom: "15%",
    left: "-20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    padding: "15px 25px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  footer: {
    position: "absolute",
    bottom: "30px",
    left: "10%",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  }
};

export default Home;
