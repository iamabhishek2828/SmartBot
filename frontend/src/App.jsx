import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append('username', username);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData,
        credentials: 'include' // To include cookies if needed
      });
      if (response.ok) {
        // On success, redirect to the dashboard
        window.location.href = 'http://localhost:8000/dashboard';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart Study Planner</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Tip: Use "tutor1" for tutor view; any other username for student view.</p>
    </div>
  );
}

export default App;
