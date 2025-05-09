import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './forms/Login';
import AdminDashboard from './pages/AdminDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import TenantDashboard from './pages/TenantDashboard';

function app() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login show={true} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
      </Routes>
    </Router>
  );
}

export default app;
