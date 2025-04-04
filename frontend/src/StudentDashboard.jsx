import React from 'react';

const pageStyle = {
  margin: 0,
  padding: 0,
  width: '100vw',
  minHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: '#f0f2f5',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  margin: '0',
  padding: '20px 0',
  fontSize: '2rem'
};

const subtitleStyle = {
  textAlign: 'center',
  margin: '0',
  padding: '0 0 20px 0',
  color: '#555'
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box'
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

function StudentDashboard() {
  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Student Dashboard</h1>
      <p style={subtitleStyle}>
        Welcome to Smart Study Planner. Here you can view your study plan, track progress,
        and manage your assignments.
      </p>

      <div style={containerStyle}>
        {/* Card 1: Today's Study Plan */}
        <div style={cardStyle}>
          <h2 style={{ color: '#007bff' }}>Today’s Study Plan</h2>
          <ul>
              <li style={{ color: 'black' }}>Web Technoloy: 2 hours</li>
              <li style={{ color: 'black' }}>CV: 1.5 hours</li>
              <li style={{ color: 'black' }}>ANN: 1 hour</li>
            
          </ul>
        </div>

        {/* Card 2: Upcoming Assignments */}
        <div style={cardStyle}>
          <h2 style={{ color: '#28a745' }}>Upcoming Assignments</h2>
          <ul>
            <li style={{ color: 'black' }}>CV Assignment - Due: 2025-04-30</li>
            <li style={{ color: 'black' }} >Web Project - Due: 2025-05-05</li>
            <li style={{ color: 'black' }}>HCI Test- Due: 2025-05-10</li>
          </ul>
        </div>
      </div>

      {/* Progress Overview Section */}
      <div style={progressContainerStyle}>
        <h2 style={{ color: '#ff9800' }}>Progress Overview</h2>
        <p style={{ color: 'black' }}>Your overall progress: 75%</p>
        <div style={{ background: '#ddd', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: '75%', background: '#007bff', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
