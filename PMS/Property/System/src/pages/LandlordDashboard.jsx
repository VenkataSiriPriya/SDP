import React, { useState } from 'react';
import '../css/LandlordDashboard.css';
import {
  Building,
  Users,
  Trash2,
  Edit2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const LandlordDashboard = () => {
  const [landlords, setLandlords] = useState([
    { id: 1, name: 'John Doe', properties: 3, tenants: 10 },
    { id: 2, name: 'Jane Smith', properties: 5, tenants: 18 },
  ]);

  const [newLandlord, setNewLandlord] = useState({ name: '', properties: '', tenants: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewLandlord({ ...newLandlord, [e.target.name]: e.target.value });
  };

  const handleAddLandlord = () => {
    if (!newLandlord.name || !newLandlord.properties || !newLandlord.tenants) return;

    if (editingId !== null) {
      setLandlords((prev) =>
        prev.map((landlord) =>
          landlord.id === editingId ? { ...landlord, ...newLandlord, id: editingId } : landlord
        )
      );
      setEditingId(null);
    } else {
      setLandlords([
        ...landlords,
        {
          id: Date.now(),
          name: newLandlord.name,
          properties: parseInt(newLandlord.properties),
          tenants: parseInt(newLandlord.tenants),
        },
      ]);
    }

    setNewLandlord({ name: '', properties: '', tenants: '' });
  };

  const handleDelete = (id) => {
    setLandlords(landlords.filter((landlord) => landlord.id !== id));
  };

  const handleEdit = (landlord) => {
    setNewLandlord(landlord);
    setEditingId(landlord.id);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">PropertyOwner Dashboard</h1>

      {/* Form */}
      <div className="landlord-form">
        <input
          type="text"
          name="name"
          placeholder="Landlord Name"
          value={newLandlord.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="properties"
          placeholder="Number of Properties"
          value={newLandlord.properties}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="tenants"
          placeholder="Number of Tenants"
          value={newLandlord.tenants}
          onChange={handleInputChange}
        />
        <button className="action-btn blue" onClick={handleAddLandlord}>
          {editingId ? 'Update Landlord' : 'Add Landlord'}
        </button>
      </div>

      {/* Cards */}
      <div className="landlord-cards">
        {landlords.map((landlord) => (
          <div key={landlord.id} className="landlord-card">
            <h3>{landlord.name}</h3>
            <p><Building size={16} /> Properties: {landlord.properties}</p>
            <p><Users size={16} /> Tenants: {landlord.tenants}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(landlord)} className="edit-btn"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(landlord.id)} className="delete-btn"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-card">
        <h2 className="chart-title">Properties by Landlord</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={landlords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="properties" fill="#4f46e5" name="Properties" />
            <Bar dataKey="tenants" fill="#10b981" name="Tenants" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LandlordDashboard;
