import React, { useState } from 'react';
import '../css/AdminDashboard.css';

// Sample data for landlords
const landlordData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    joinDate: "2023-05-12",
    propertyCount: 4,
    rating: 4.8,
    properties: [
      { id: 101, name: "Sunset Apartments", units: 12, address: "123 Sunset Blvd" },
      { id: 102, name: "Oakwood Heights", units: 8, address: "456 Oak Street" },
      { id: 103, name: "Riverside Condos", units: 6, address: "789 River Road" },
      { id: 104, name: "Pine View Homes", units: 3, address: "321 Pine Avenue" }
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    joinDate: "2022-11-23",
    propertyCount: 2,
    rating: 4.5,
    properties: [
      { id: 201, name: "Lakeview Apartments", units: 10, address: "567 Lake Drive" },
      { id: 202, name: "Mountain View Condos", units: 4, address: "890 Mountain Road" }
    ]
  },
  {
    id: 3,
    name: "Robert Chen",
    email: "robert.chen@example.com",
    phone: "(555) 456-7890",
    joinDate: "2024-01-15",
    propertyCount: 3,
    rating: 4.9,
    properties: [
      { id: 301, name: "Downtown Lofts", units: 15, address: "432 Main Street" },
      { id: 302, name: "Harbor View", units: 6, address: "765 Harbor Blvd" },
      { id: 303, name: "Parkside Residences", units: 8, address: "901 Park Lane" }
    ]
  }
];

// Sample data for tenants
const tenantData = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 234-5678",
    moveInDate: "2023-06-01",
    propertyId: 101,
    unitNumber: "3B",
    leaseEnd: "2024-06-01",
    rentAmount: 1250,
    paymentStatus: "Current"
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    moveInDate: "2022-09-15",
    propertyId: 102,
    unitNumber: "5A",
    leaseEnd: "2024-09-15",
    rentAmount: 1450,
    paymentStatus: "Current"
  },
  {
    id: 3,
    name: "David Garcia",
    email: "david.garcia@example.com",
    phone: "(555) 456-7890",
    moveInDate: "2023-11-01",
    propertyId: 201,
    unitNumber: "2C",
    leaseEnd: "2024-11-01",
    rentAmount: 1350,
    paymentStatus: "Late"
  },
  {
    id: 4,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "(555) 567-8901",
    moveInDate: "2024-01-15",
    propertyId: 301,
    unitNumber: "7D",
    leaseEnd: "2025-01-15",
    rentAmount: 1550,
    paymentStatus: "Current"
  },
  {
    id: 5,
    name: "Thomas Wilson",
    email: "thomas.wilson@example.com",
    phone: "(555) 678-9012",
    moveInDate: "2023-08-01",
    propertyId: 103,
    unitNumber: "1A",
    leaseEnd: "2024-08-01",
    rentAmount: 1200,
    paymentStatus: "Current"
  }
];

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [landlords, setLandlords] = useState(landlordData);
  const [tenants, setTenants] = useState(tenantData);
  const [selectedLandlord, setSelectedLandlord] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [editMode, setEditMode] = useState({ active: false, type: null, data: null });
  
  // Find property name by ID
  const getPropertyNameById = (id) => {
    for (const landlord of landlords) {
      for (const property of landlord.properties) {
        if (property.id === id) return property.name;
      }
    }
    return "Unknown Property";
  };

  // Handle delete operations
  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'landlord') {
        setLandlords(landlords.filter(landlord => landlord.id !== id));
        if (selectedLandlord && selectedLandlord.id === id) {
          setSelectedLandlord(null);
          setView('landlords');
        }
      } else if (type === 'tenant') {
        setTenants(tenants.filter(tenant => tenant.id !== id));
        if (selectedTenant && selectedTenant.id === id) {
          setSelectedTenant(null);
          setView('tenants');
        }
      } else if (type === 'property') {
        const updatedLandlords = [...landlords];
        const landlordIndex = updatedLandlords.findIndex(l => 
          l.properties.some(p => p.id === id)
        );
        
        if (landlordIndex !== -1) {
          updatedLandlords[landlordIndex].properties = 
            updatedLandlords[landlordIndex].properties.filter(p => p.id !== id);
          updatedLandlords[landlordIndex].propertyCount -= 1;
          setLandlords(updatedLandlords);
          setSelectedLandlord(updatedLandlords[landlordIndex]);
        }
      }
    }
  };

  // Handle edit operations
  const handleEdit = (type, data) => {
    setEditMode({
      active: true,
      type,
      data: {...data}
    });
  };

  // Handle save after editing
  const handleSave = () => {
    const { type, data } = editMode;
    
    if (type === 'landlord') {
      const updatedLandlords = landlords.map(landlord => 
        landlord.id === data.id ? data : landlord
      );
      setLandlords(updatedLandlords);
      setSelectedLandlord(data);
    } else if (type === 'tenant') {
      const updatedTenants = tenants.map(tenant => 
        tenant.id === data.id ? data : tenant
      );
      setTenants(updatedTenants);
      setSelectedTenant(data);
    } else if (type === 'property') {
      const updatedLandlords = [...landlords];
      const landlordIndex = updatedLandlords.findIndex(l => 
        l.properties.some(p => p.id === data.id)
      );
      
      if (landlordIndex !== -1) {
        updatedLandlords[landlordIndex].properties = 
          updatedLandlords[landlordIndex].properties.map(p => 
            p.id === data.id ? data : p
          );
        setLandlords(updatedLandlords);
        setSelectedLandlord(updatedLandlords[landlordIndex]);
      }
    }
    
    setEditMode({ active: false, type: null, data: null });
  };

  // Handle form changes for edit mode
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditMode(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      }
    }));
  };

  // Render edit form based on type
  const renderEditForm = () => {
    const { type, data } = editMode;
    
    if (type === 'landlord') {
      return (
        <div className="edit-form">
          <h3>Edit Landlord</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={data.name} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={data.email} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input 
                type="text" 
                name="phone" 
                value={data.phone} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input 
                type="number" 
                name="rating" 
                min="1" 
                max="5" 
                step="0.1" 
                value={data.rating} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setEditMode({ active: false, type: null, data: null })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    } else if (type === 'tenant') {
      return (
        <div className="edit-form">
          <h3>Edit Tenant</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={data.name} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={data.email} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input 
                type="text" 
                name="phone" 
                value={data.phone} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Unit Number:</label>
              <input 
                type="text" 
                name="unitNumber" 
                value={data.unitNumber} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Lease End:</label>
              <input 
                type="date" 
                name="leaseEnd" 
                value={data.leaseEnd} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Rent Amount:</label>
              <input 
                type="number" 
                name="rentAmount" 
                value={data.rentAmount} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Payment Status:</label>
              <select 
                name="paymentStatus" 
                value={data.paymentStatus} 
                onChange={handleFormChange}
              >
                <option value="Current">Current</option>
                <option value="Late">Late</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setEditMode({ active: false, type: null, data: null })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    } else if (type === 'property') {
      return (
        <div className="edit-form">
          <h3>Edit Property</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-group">
              <label>Property Name:</label>
              <input 
                type="text" 
                name="name" 
                value={data.name} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input 
                type="text" 
                name="address" 
                value={data.address} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-group">
              <label>Units:</label>
              <input 
                type="number" 
                name="units" 
                min="1" 
                value={data.units} 
                onChange={handleFormChange} 
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setEditMode({ active: false, type: null, data: null })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    }
    
    return null;
  };

  // Dashboard view
  const renderDashboard = () => (
    <div className="admin-dashboard">
      <h2>Welcome, Admin</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Landlords</h3>
          <p className="stat-number">{landlords.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tenants</h3>
          <p className="stat-number">{tenants.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p className="stat-number">
            {landlords.reduce((total, landlord) => total + landlord.propertyCount, 0)}
          </p>
        </div>
      </div>
      
      <section className="admin-section">
        <h3>Landlord Management</h3>
        <button className="action-button" onClick={() => setView('landlords')}>
          View All Landlords
        </button>
        <ul className="feature-list">
          <li>View detailed landlord profiles</li>
          <li>Add/Edit/Remove landlords</li>
          <li>View landlord properties</li>
          <li>Landlord performance metrics</li>
        </ul>
      </section>
      
      <section className="admin-section">
        <h3>Tenant Management</h3>
        <button className="action-button" onClick={() => setView('tenants')}>
          View All Tenants
        </button>
        <ul className="feature-list">
          <li>View detailed tenant profiles</li>
          <li>Add/Edit/Remove tenants</li>
          <li>Assign tenants to properties</li>
          <li>Track lease agreements and payments</li>
        </ul>
      </section>
    </div>
  );

  // Landlords view
  const renderLandlords = () => (
    <div className="landlords-view">
      <div className="view-header">
        <h2>Landlord Management</h2>
        <button className="back-button" onClick={() => setView('dashboard')}>
          Back to Dashboard
        </button>
      </div>
      
      <div className="action-bar">
        <input type="text" placeholder="Search landlords..." className="search-input" />
        <button className="add-button">+ Add New Landlord</button>
      </div>
      
      <div className="landlord-list">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Properties</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {landlords.map(landlord => (
              <tr key={landlord.id}>
                <td>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setSelectedLandlord(landlord);
                    setView('landlordProfile');
                  }}>
                    {landlord.name}
                  </a>
                </td>
                <td>{landlord.email}</td>
                <td>{landlord.phone}</td>
                <td>{landlord.propertyCount}</td>
                <td>{landlord.rating}/5.0</td>
                <td>
                  <button 
                    className="action-btn edit" 
                    onClick={() => handleEdit('landlord', landlord)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDelete('landlord', landlord.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode.active && editMode.type === 'landlord' && renderEditForm()}
    </div>
  );

  // Tenants view
  const renderTenants = () => (
    <div className="tenants-view">
      <div className="view-header">
        <h2>Tenant Management</h2>
        <button className="back-button" onClick={() => setView('dashboard')}>
          Back to Dashboard
        </button>
      </div>
      
      <div className="action-bar">
        <input type="text" placeholder="Search tenants..." className="search-input" />
        <button className="add-button">+ Add New Tenant</button>
      </div>
      
      <div className="tenant-list">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Property</th>
              <th>Unit</th>
              <th>Lease End</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.id} className={tenant.paymentStatus === 'Late' ? 'status-warning' : ''}>
                <td>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setSelectedTenant(tenant);
                    setView('tenantProfile');
                  }}>
                    {tenant.name}
                  </a>
                </td>
                <td>{tenant.email}</td>
                <td>{getPropertyNameById(tenant.propertyId)}</td>
                <td>{tenant.unitNumber}</td>
                <td>{tenant.leaseEnd}</td>
                <td className={`status-${tenant.paymentStatus.toLowerCase()}`}>
                  {tenant.paymentStatus}
                </td>
                <td>
                  <button 
                    className="action-btn edit" 
                    onClick={() => handleEdit('tenant', tenant)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDelete('tenant', tenant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode.active && editMode.type === 'tenant' && renderEditForm()}
    </div>
  );

  // Landlord profile view
  const renderLandlordProfile = () => {
    if (!selectedLandlord) return <div>No landlord selected</div>;

    return (
      <div className="profile-view">
        <div className="view-header">
          <h2>Landlord Profile</h2>
          <button className="back-button" onClick={() => setView('landlords')}>
            Back to Landlords
          </button>
        </div>
        
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {selectedLandlord.name.charAt(0)}
            </div>
            <div className="profile-basics">
              <h3>{selectedLandlord.name}</h3>
              <p className="profile-id">ID: {selectedLandlord.id}</p>
              <p className="profile-since">Member since: {selectedLandlord.joinDate}</p>
            </div>
            <div className="profile-actions">
              <button 
                className="profile-edit-btn" 
                onClick={() => handleEdit('landlord', selectedLandlord)}
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="details-section">
              <h4>Contact Information</h4>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedLandlord.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedLandlord.phone}</span>
              </div>
            </div>
            
            <div className="details-section">
              <h4>Performance</h4>
              <div className="detail-row">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">{selectedLandlord.rating}/5.0</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Properties:</span>
                <span className="detail-value">{selectedLandlord.propertyCount}</span>
              </div>
            </div>
          </div>
          
          <div className="properties-section">
            <h4>Properties ({selectedLandlord.properties.length})</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Property Name</th>
                  <th>Address</th>
                  <th>Units</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedLandlord.properties.map(property => (
                  <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>{property.name}</td>
                    <td>{property.address}</td>
                    <td>{property.units}</td>
                    <td>
                      <button className="action-btn">View</button>
                      <button 
                        className="action-btn edit"
                        onClick={() => handleEdit('property', property)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete('property', property.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editMode.active && 
         (editMode.type === 'landlord' || editMode.type === 'property') && 
         renderEditForm()}
      </div>
    );
  };

  // Tenant profile view
  const renderTenantProfile = () => {
    if (!selectedTenant) return <div>No tenant selected</div>;
    
    return (
      <div className="profile-view">
        <div className="view-header">
          <h2>Tenant Profile</h2>
          <button className="back-button" onClick={() => setView('tenants')}>
            Back to Tenants
          </button>
        </div>
        
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {selectedTenant.name.charAt(0)}
            </div>
            <div className="profile-basics">
              <h3>{selectedTenant.name}</h3>
              <p className="profile-id">ID: {selectedTenant.id}</p>
              <p className="profile-since">Tenant since: {selectedTenant.moveInDate}</p>
              <p className={`status-tag status-${selectedTenant.paymentStatus.toLowerCase()}`}>
                {selectedTenant.paymentStatus}
              </p>
            </div>
            <div className="profile-actions">
              <button 
                className="profile-edit-btn"
                onClick={() => handleEdit('tenant', selectedTenant)}
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="details-section">
              <h4>Contact Information</h4>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedTenant.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedTenant.phone}</span>
              </div>
            </div>
            
            <div className="details-section">
              <h4>Housing Information</h4>
              <div className="detail-row">
                <span className="detail-label">Property:</span>
                <span className="detail-value">{getPropertyNameById(selectedTenant.propertyId)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Unit:</span>
                <span className="detail-value">{selectedTenant.unitNumber}</span>
              </div>
            </div>
            
            <div className="details-section">
              <h4>Lease Details</h4>
              <div className="detail-row">
                <span className="detail-label">Move-in Date:</span>
                <span className="detail-value">{selectedTenant.moveInDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Lease End:</span>
                <span className="detail-value">{selectedTenant.leaseEnd}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Monthly Rent:</span>
                <span className="detail-value">${selectedTenant.rentAmount}</span>
              </div>
            </div>
          </div>
          
          <div className="payment-history-section">
            <h4>Payment History</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-05-01</td>
                  <td>${selectedTenant.rentAmount}</td>
                  <td className="status-current">Paid</td>
                </tr>
                <tr>
                  <td>2025-04-01</td>
                  <td>${selectedTenant.rentAmount}</td>
                  <td className="status-current">Paid</td>
                </tr>
                <tr>
                  <td>2025-03-01</td>
                  <td>${selectedTenant.rentAmount}</td>
                  <td className="status-late">Late (3 days)</td>
                </tr>
                <tr>
                  <td>2025-02-01</td>
                  <td>${selectedTenant.rentAmount}</td>
                  <td className="status-current">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {editMode.active && editMode.type === 'tenant' && renderEditForm()}
      </div>
    );
  };

  return (
    <div className="admin-dashboard-container">
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      
      <header className="admin-header">
        <h1 className="logo">Propsync</h1>
        <div className="user-menu">
          <span className="user-name">Admin User</span>
          <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <ul>
              {['dashboard', 'landlords', 'tenants'].map(item => (
                <li key={item} className={
                  view === item || 
                  (view === 'landlordProfile' && item === 'landlords') ||
                  (view === 'tenantProfile' && item === 'tenants') 
                    ? 'active' : ''
                }>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    if (['dashboard', 'landlords', 'tenants'].includes(item)) {
                      setView(item);
                    }
                  }}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="admin-main">
          {view === 'dashboard' && renderDashboard()}
          {view === 'landlords' && renderLandlords()}
          {view === 'tenants' && renderTenants()}
          {view === 'landlordProfile' && renderLandlordProfile()}
          {view === 'tenantProfile' && renderTenantProfile()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;