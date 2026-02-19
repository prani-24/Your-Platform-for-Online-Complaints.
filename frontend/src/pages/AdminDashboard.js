import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch complaints when View Complaints clicked
  const fetchComplaints = () => {
    console.log("Fetching complaints from API...");
    fetch("http://localhost:5001/api/complaints/all") // Hits the unified complaints controller
      .then(res => res.json())
      .then(data => {
        console.log("Received data:", data);
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          setComplaints([]);
          console.error("API did not return an array:", data);
        }
      })
      .catch(err => {
        console.error("Error fetching complaints:", err);
      });
  };

  useEffect(() => {
    if (activePage === "complaints") {
      fetchComplaints();
    }
  }, [activePage]);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "Resolved" ? "Pending" : "Resolved";
    try {
      const res = await fetch(`http://localhost:5001/api/complaints/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const contentType = res.headers.get("content-type");
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        fetchComplaints(); // Refresh the list
      } else {
        alert(`Failed to update status: ${data.message || res.statusText}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Connection error: ${err.message}. Please restart both your frontend and backend.`);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Admin Panel</h2>
        </div>

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.menuBtn,
              backgroundColor: activePage === "complaints" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => setActivePage("complaints")}
          >
            📋 View Complaints
          </button>
          <button
            style={{
              ...styles.menuBtn,
              backgroundColor: activePage === "reports" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => setActivePage("reports")}
          >
            📊 Reports
          </button>
          <button
            style={{
              ...styles.menuBtn,
              backgroundColor: activePage === "users" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
            onClick={() => setActivePage("users")}
          >
            👥 Users
          </button>
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout 🚪
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {activePage === "dashboard" && (
          <div style={styles.centeredContent}>
            <h1 style={styles.heading}>Welcome to Dashboard</h1>
            <p style={styles.subHeading}>Manage complaints and track reports easily.</p>

            <div style={styles.heroCards}>
              <div style={styles.heroCard}>
                <h3 style={styles.cardLabel}>All Complaints</h3>
                <p style={styles.cardNumber}>{complaints.length}</p>
                <div style={styles.cardIcon}>📥</div>
              </div>

              <div style={styles.heroCard}>
                <h3 style={styles.cardLabel}>System Health</h3>
                <p style={styles.cardNumber}>Optimal</p>
                <div style={styles.cardIcon}>🟢</div>
              </div>
            </div>
          </div>
        )}

        {activePage === "complaints" && (
          <div style={styles.complaintsContainer}>
            <h2 style={styles.sectionTitle}>User Complaints</h2>

            {complaints.length === 0 ? (
              <div style={styles.emptyState}>No complaints found</div>
            ) : (
              <div style={styles.complaintGrid}>
                {complaints.map(c => (
                  <div key={c._id} style={styles.complaintCard}>
                    <div style={styles.cardHeader}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: c.status === "Resolved" ? "#10b981" : "#f59e0b"
                      }}>
                        {c.status || "Pending"}
                      </span>
                      <span style={styles.dateText}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={styles.cardBody}>
                      <p style={styles.customerEmail}>👤 {c.customerEmail}</p>
                      <h4 style={styles.complaintTitle}>{c.title}</h4>
                      <p style={styles.complaintDesc}>{c.description}</p>
                    </div>

                    <div style={styles.cardActions}>
                      <button
                        onClick={() => handleStatusUpdate(c._id, c.status || "Pending")}
                        style={{
                          ...styles.toggleBtn,
                          background: c.status === "Resolved" ? "#f59e0b" : "#10b981"
                        }}
                      >
                        {c.status === "Resolved" ? "⏳ Mark as Pending" : "✅ Mark as Resolved"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePage === "reports" && (
          <div style={styles.centeredContent}>
            <h2 style={styles.sectionTitle}>Reports</h2>
            <p style={styles.placeholderText}>Detailed reporting system coming soon.</p>
          </div>
        )}

        {activePage === "users" && (
          <div style={styles.centeredContent}>
            <h2 style={styles.sectionTitle}>User Management</h2>
            <p style={styles.placeholderText}>Registered users will be listed here.</p>
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
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  menuBtn: {
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
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "40px",
  },
  centeredContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "18px",
    color: "#64748b",
    marginBottom: "40px",
  },
  heroCards: {
    display: "flex",
    gap: "30px",
    width: "100%",
    maxWidth: "800px",
  },
  heroCard: {
    flex: 1,
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  cardLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "10px",
  },
  cardNumber: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#4f46e5",
  },
  cardIcon: {
    fontSize: "60px",
    position: "absolute",
    right: "-10px",
    bottom: "-10px",
    opacity: "0.1",
  },
  complaintsContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "30px",
  },
  complaintGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  complaintCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #f1f5f9",
    transition: "transform 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
    color: "white",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  cardBody: {
    flex: 1,
    marginBottom: "20px",
  },
  customerEmail: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#4f46e5",
    marginBottom: "8px",
  },
  complaintTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "10px",
  },
  complaintDesc: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.7",
    backgroundColor: "#f1f5f9",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "10px",
    minHeight: "80px",
  },
  cardActions: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "16px",
  },
  toggleBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  emptyState: {
    textAlign: "center",
    padding: "50px",
    color: "#94a3b8",
    fontSize: "18px",
  },
  placeholderText: {
    color: "#64748b",
    fontSize: "16px",
  }
};

export default Dashboard;
