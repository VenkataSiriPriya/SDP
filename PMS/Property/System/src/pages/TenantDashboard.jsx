import React from 'react';
import '../css/TenantDashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Home, CreditCard, LifeBuoy, FileText } from 'lucide-react';

// Sample data for rent payments
const rentData = [
  { month: 'Jan', rent: 800 },
  { month: 'Feb', rent: 820 },
  { month: 'Mar', rent: 850 },
  { month: 'Apr', rent: 870 },
];

// Sample data for maintenance requests
const maintenanceData = [
  { month: 'Jan', requests: 1 },
  { month: 'Feb', requests: 2 },
  { month: 'Mar', requests: 1 },
  { month: 'Apr', requests: 3 },
];

const TenantDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tenant Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card blue">
          <Home className="stat-icon" />
          <div>
            <p className="stat-value">1 Property</p>
            <p className="stat-label">Your Home</p>
          </div>
        </div>
        <div className="stat-card green">
          <CreditCard className="stat-icon" />
          <div>
            <p className="stat-value">$820</p>
            <p className="stat-label">Monthly Rent</p>
          </div>
        </div>
        <div className="stat-card yellow">
          <LifeBuoy className="stat-icon" />
          <div>
            <p className="stat-value">2 Requests</p>
            <p className="stat-label">Maintenance Requests</p>
          </div>
        </div>
        <div className="stat-card purple">
          <FileText className="stat-icon" />
          <div>
            <p className="stat-value">Lease Expiring Soon</p>
            <p className="stat-label">Lease Status</p>
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Rent Payment History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rentData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rent" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Maintenance Requests</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={maintenanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="action-buttons">
        <button className="action-btn blue">View Payment History</button>
        <button className="action-btn green">Request Maintenance</button>
      </div>
    </div>
  );
};

export default TenantDashboard;
