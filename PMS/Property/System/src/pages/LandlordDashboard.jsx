import React from 'react';
import '../css/LandlordDashboard.css' 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, Users, Wrench, DollarSign } from 'lucide-react';
const rentData = [
  { month: 'Jan', rent: 4000 },
  { month: 'Feb', rent: 4200 },
  { month: 'Mar', rent: 4500 },
  { month: 'Apr', rent: 4700 },
];

const LandlordDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Landlord Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card blue">
          <Building className="stat-icon" />
          <div>
            <p className="stat-value">12 Properties</p>
            <p className="stat-label">Total Units</p>
          </div>
        </div>
        <div className="stat-card green">
          <Users className="stat-icon" />
          <div>
            <p className="stat-value">28 Tenants</p>
            <p className="stat-label">Active Leases</p>
          </div>
        </div>
        <div className="stat-card yellow">
          <Wrench className="stat-icon" />
          <div>
            <p className="stat-value">4 Requests</p>
            <p className="stat-label">Open Maintenance</p>
          </div>
        </div>
        <div className="stat-card purple">
          <DollarSign className="stat-icon" />
          <div>
            <p className="stat-value">$18,200</p>
            <p className="stat-label">Total Collected</p>
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Monthly Rent Income</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rentData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rent" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="action-buttons">
        <button className="action-btn blue">Add New Property</button>
        <button className="action-btn green">Manage Tenants</button>
      </div>
    </div>
  );
};

export default LandlordDashboard;
