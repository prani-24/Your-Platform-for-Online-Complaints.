import React, { useState } from 'react';

export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));  // Get logged-in customer info
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitComplaint = async () => {
    await fetch('http://localhost:5001/api/complaints/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: user.name,  // Send user name
        subject,
        message,
      }),
    });

    alert('Complaint submitted!');
    setSubject('');
    setMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user?.name}</h2>
      <h3>Add a Complaint</h3>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Describe your issue"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={submitComplaint}>Submit Complaint</button>
    </div>
  );
}
