import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to EduPortal</h1>
          <p>Your gateway to academic excellence and seamless student management</p>
          <Link to="/dashboard" className="btn">Get Started</Link>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="card">
              <h3>Course Management</h3>
              <p>Access all your courses, materials, and assignments in one place</p>
            </div>
            <div className="card">
              <h3>Grade Tracking</h3>
              <p>Monitor your academic progress with real-time grade updates</p>
            </div>
            <div className="card">
              <h3>Student Profile</h3>
              <p>Manage your personal information and academic details</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;