import React, { useState, useEffect } from "react";

const ChatWindow = ({ complaintId, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    const res = await fetch(`http://localhost:5001/api/messages/${complaintId}`);
    const data = await res.json();
    setMessages(data);
  };

  const handleSend = async () => {
    if (!newMessage) return;
    await fetch("http://localhost:5001/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complaintId,
        sender: userRole === "Admin" ? "Agent" : "Customer",
        message: newMessage
      })
    });
    setNewMessage("");
    fetchMessages();
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", maxHeight: "300px", overflowY: "auto" }}>
      {messages.map((m, i) => (
        <div key={i} style={{ textAlign: m.sender === "Agent" ? "left" : "right", margin: "5px 0" }}>
          <b>{m.sender}:</b> {m.message}
        </div>
      ))}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input style={{ flex: 1, padding: "5px" }} value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your message..." />
        <button onClick={handleSend} style={{ padding: "5px 10px", marginLeft: "5px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "5px" }}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
