import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import FloorMap from './pages/admin/FloorMap';
import TicketManagement from './pages/admin/TicketManagement';
import ServiceHub from './pages/admin/ServiceHub';
import StaffManagement from './pages/admin/StaffManagement';
import GateControl from './pages/admin/GateControl';
import Security from './pages/admin/Security';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';



import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes with Navbar */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Admin Routes with Sidebar */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tickets" element={<TicketManagement />} />
              <Route path="floors" element={<FloorMap />} />
              <Route path="services" element={<ServiceHub />} />
              <Route path="gates" element={<GateControl />} />
              <Route path="security" element={<Security />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
