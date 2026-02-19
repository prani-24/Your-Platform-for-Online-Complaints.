import React, { useEffect, useState } from "react";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/complaints");
      const data = await res.json();
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) return <p>Loading complaints...</p>;
  if (complaints.length === 0) return <p>No complaints found.</p>;

  return (
    <div>
      <h2>Complaint List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.subject}</td>
              <td>{c.message}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintList;
