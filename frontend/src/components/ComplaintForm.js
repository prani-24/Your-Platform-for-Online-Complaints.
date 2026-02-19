import React, { useState } from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !customerEmail) {
      alert("Please fill all fields!");
      return;
    }

    const complaintData = { title, description, customerEmail };

    try {
      const response = await fetch("http://localhost:5001/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        alert("Complaint submitted successfully!");
        setTitle("");
        setDescription("");
        setCustomerEmail("");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Submit Your Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", height: "100px" }}
          ></textarea>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Your Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
