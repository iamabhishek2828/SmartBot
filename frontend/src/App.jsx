import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: formData,
      credentials: 'include' 
    });
    if (response.ok) {
      window.location.href = 'http://localhost:8000/dashboard';
    } else {
      alert('Login failed');
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
