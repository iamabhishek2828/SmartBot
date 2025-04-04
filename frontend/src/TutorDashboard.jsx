import React from 'react';

const pageStyle = {
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  boxSizing: 'border-box',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  margin: '20px 0',
  fontSize: '2rem',
};

const subtitleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#555',
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  padding: '20px 0',
  boxSizing: 'border-box',
};

const cardStyle = {
  flex: '1 1 300px',
  maxWidth: '400px',
  margin: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  padding: '20px',
};

const progressContainerStyle = {
  width: '100%',
  margin: '20px 10px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  padding: '20px',
};

function TutorDashboard() {
  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Tutor Dashboard</h1>
      <p style={subtitleStyle}>
        Welcome to Smart Study Planner. Here you can review student performance and manage study plans.
      </p>

      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: 'black' }}>Student Performance</h2>
          <ul>
            <li style={{ color: 'black' }}>Student A: 85%</li>
            <li style={{ color: 'black' }}>Student B: 70%</li>
            <li style={{ color: 'black' }}>Student C: 90%</li>
          </ul>
        </div>
        <div style={cardStyle}>
          <h2 style={{ color: '#28a745' }}>Upcoming Reviews</h2>
          <ul>
            <li style={{ color: 'black' }}>Review CV Assignment</li>
            <li style={{ color: 'black' }}>Review Web Project</li>
            <li style={{ color: 'black' }}>Schedule tutoring session</li>
          </ul>
        </div>
      </div>

      <div style={progressContainerStyle}>
        <h2 style={{ color: '#ff9800' }}>Overall Dashboard Metrics</h2>
        <p style={{ color: 'black' }}>Average class performance: 80%</p>
        <div style={{ background: '#ddd', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: '80%', background: '#007bff', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
