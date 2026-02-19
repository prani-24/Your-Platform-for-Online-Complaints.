import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Robustly get email from localStorage
  const getStoredEmail = () => {
    const standaloneEmail = localStorage.getItem("email");
    if (standaloneEmail) return standaloneEmail;

    const userObj = localStorage.getItem("user");
    if (userObj) return JSON.parse(userObj).email;

    return "";
  };

  const [customerEmail, setCustomerEmail] = useState(getStoredEmail());
  const [complaints, setComplaints] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Submit complaint function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !customerEmail) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          customerEmail,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Complaint submitted successfully! Click 'My Complaints' to see it.");
        setTitle("");
        setDescription("");
        // Optionally switch to complaints view immediately
        fetchComplaints();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Submit failed");
    }
  };

  // Fetch my complaints
  const fetchComplaints = async () => {
    const email = getStoredEmail();
    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5001/api/complaints/mycomplaints/${email}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert(`Cannot fetch complaints: ${err.message}`);
    }
  };

  const handleCardClick = (card) => {
    setActiveCard(card);
    if (card === "myComplaints") fetchComplaints();
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Customer Portal</h2>
          <p style={styles.welcomeText}>
            Welcome, {JSON.parse(localStorage.getItem("user"))?.name || "Customer"} 👋
          </p>
        </div>

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navItem,
              backgroundColor: activeCard === "raiseComplaint" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => handleCardClick("raiseComplaint")}
          >
            ➕ Raise Complaint
          </button>
          <button
            style={{
              ...styles.navItem,
              backgroundColor: activeCard === "myComplaints" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => handleCardClick("myComplaints")}
          >
            📄 My Complaints
          </button>
          <button
            style={{
              ...styles.navItem,
              backgroundColor: activeCard === "status" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => handleCardClick("status")}
          >
            🔔 Complaint Status
          </button>
        </nav>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout 🚪
        </button>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {!activeCard && (
          <div style={styles.centeredContent}>
            <h1 style={styles.heroTitle}>How can we help you today?</h1>
            <p style={styles.heroSubtitle}>Select an option from the sidebar to get started.</p>
          </div>
        )}

        {activeCard === "raiseComplaint" && (
          <div style={styles.centeredContent}>
            <div style={styles.formWrapper}>
              <form onSubmit={handleSubmit} style={styles.modernForm}>
                <h2 style={styles.formTitle}>📝 Raise a New Complaint</h2>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Complaint Title</label>
                  <input
                    type="text"
                    placeholder="What is the issue?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={styles.modernInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Detailed Description</label>
                  <textarea
                    placeholder="Explain the problem in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.modernTextarea}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Register Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    style={styles.modernInput}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Submit Complaint 🚀
                </button>
              </form>
            </div>
          </div>
        )}

        {activeCard === "myComplaints" && (
          <div style={styles.contentPadding}>
            <h3 style={styles.contentTitle}>My Complaints:</h3>
            {complaints.length === 0 ? (
              <p style={styles.noData}>No complaints yet</p>
            ) : (
              <ul style={styles.complaintList}>
                {complaints.map((c) => (
                  <li key={c._id} style={styles.complaintItem}>
                    <div style={styles.complaintHeader}>
                      <strong style={styles.complaintSubject}>{c.title}</strong>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: c.status === "Resolved" ? "#10b981" : "#f59e0b"
                      }}>
                        {c.status || "Pending"}
                      </span>
                    </div>
                    <p style={styles.complaintBody}>{c.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeCard === "status" && (
          <div style={styles.centeredContent}>
            <div style={styles.statusCard}>
              <h3 style={styles.contentTitle}>Complaint Status Tracking</h3>
              <p style={styles.heroSubtitle}>Click "My Complaints" in the sidebar to view the live status of all your submissions.</p>
              <div style={styles.statusIcon}>🔔</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f8fafc",
  },
  sidebar: {
    width: "280px",
    background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  sidebarHeader: {
    marginBottom: "40px",
    textAlign: "center",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    margin: "0",
  },
  welcomeText: {
    fontSize: "14px",
    opacity: "0.9",
    marginTop: "5px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  navItem: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "#f1f5f9",
    position: "relative",
  },
  centeredContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  contentPadding: {
    padding: "40px",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "10px",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#64748b",
    textAlign: "center",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    animation: "fadeIn 0.5s ease",
  },
  modernForm: {
    background: "white",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "550px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  formTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "8px",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#475569",
    paddingLeft: "4px",
  },
  modernInput: {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s",
    outline: "none",
  },
  modernTextarea: {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
    minHeight: "140px",
    resize: "none",
    outline: "none",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
    transition: "transform 0.2s, opacity 0.2s",
  },
  contentTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "24px",
  },
  complaintList: {
    listStyle: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  complaintItem: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    borderLeft: "6px solid #4f46e5",
  },
  complaintHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  complaintSubject: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
    color: "white",
    textTransform: "uppercase",
  },
  complaintBody: {
    color: "#475569",
    lineHeight: "1.6",
    fontSize: "15px",
    margin: "0",
  },
  noData: {
    fontSize: "16px",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "40px",
  },
  statusCard: {
    background: "white",
    padding: "50px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
  },
  statusIcon: {
    fontSize: "64px",
    marginTop: "20px",
  }
};

export default CustomerDashboard;
