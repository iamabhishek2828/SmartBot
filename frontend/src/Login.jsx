import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pageStyle = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f0f2f5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
};

const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgb(212, 196, 196)',
  width: '90%',
  maxWidth: '400px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginTop: '10px',
};

const tipStyle = {
  textAlign: 'center',
  marginTop: '20px',
  color: '#555',
};

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Allows cookies to be sent
        body: JSON.stringify({ username }),
      });
      
      if (response.ok) {
        if (username === 'tutor1') {
          navigate('/tutor-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setError('Login failed. Please check your username and try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={headerStyle}>Smart Study Planner</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
        <p style={tipStyle}>
          Tip: Use "tutor1" for tutor view; any other username for student view.
        </p>
      </div>
    </div>
  );
}

export default Login;

