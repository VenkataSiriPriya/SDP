// src/components/AdminNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminDashboard.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Home
      </button>
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="admin-navbar-spacer" />
    </nav>
  );
};

export default AdminNavbar;
