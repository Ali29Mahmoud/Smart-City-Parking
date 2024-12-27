import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar } from '@/components/layout/navbar';
import { Dashboard } from '@/pages/dashboard';
import { LoginPage } from '@/pages/auth/login';
import { RoleSelectionPage } from '@/pages/auth/role-selection';
import { DriverDashboard } from '@/pages/dashboard/driver-dashboard';
import { ManagerDashboard } from '@/pages/dashboard/manager-dashboard';
import { AdminDashboard } from '@/pages/dashboard/admin-dashboard';
import { useAuth } from '@/contexts/auth-context';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route
              path="/"
              element={
                user ? (
                  user.role === 'driver' ? (
                    <DriverDashboard />
                  ) : user.role === 'manager' ? (
                    <ManagerDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                ) : (
                  <LoginPage />
                )
              }
            />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;