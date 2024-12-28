import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ParkingLotCard } from './components/ParkingLotCard';
import { SpotGrid } from './components/SpotGrid';
import { ReservationModal } from './components/ReservationModal';
import type { ParkingLot, ParkingSpot } from './types';
import { getUserRole } from './utils/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DriverLayout from './components/DriverLayout';

// Mock data - replace with actual API calls
const mockParkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Downtown Parking',
    location: '123 Main St',
    capacity: 100,
    basePrice: 5,
    multiplier: 1.2,
    spots: Array.from({ length: 20 }, (_, i) => ({
      id: `spot-${i}`,
      lotId: '1',
      number: `A${i + 1}`,
      type: i % 5 === 0 ? 'ev' : i % 7 === 0 ? 'disabled' : 'regular',
      status: Math.random() > 0.5 ? 'available' : 'occupied',
      price: 5,
    })),
  },
  // Add more parking lots here
];

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const userRole = getUserRole();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function RequireAuth({ children }: { children: () => JSX.Element }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children();
}

function App() {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const handleReservation = (duration: number) => {
    if (selectedSpot) {
      // Handle reservation logic here
      console.log(`Reserved spot ${selectedSpot.number} for ${duration} hours`);
      setSelectedSpot(null);
    }
  };

  return (
    <Routes>
      {/* Redirect root to appropriate page based on role */}
      <Route path="/" element={
        <RequireAuth>
          {() => {
            const role = getUserRole();
            if (role === 'DRIVER') return <Navigate to="/driver/home" replace />;
            if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
            return <Navigate to="/login" replace />;
          }}
        </RequireAuth>
      } />
      
      <Route path="/login" element={<Login />} />
      
      <Route path="/driver/*" element={
        <ProtectedRoute allowedRoles={['DRIVER']}>
          <DriverLayout />
        </ProtectedRoute>
      } />

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;