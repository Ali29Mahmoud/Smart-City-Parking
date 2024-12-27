import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parkingApi = {
  // Auth
  loginWithGoogle: (token: string) => 
    api.post('/auth/google', { token }),
  getCurrentUser: () => 
    api.get('/auth/me'),
  updateUserRole: (role: string) => 
    api.post('/auth/role', { role }),

  // Parking Lots
  getParkingLots: () => 
    api.get('/parking-lots'),
  getParkingLot: (id: string) => 
    api.get(`/parking-lots/${id}`),
  createParkingLot: (data: any) => 
    api.post('/parking-lots', data),
  updateParkingLot: (id: string, data: any) => 
    api.put(`/parking-lots/${id}`, data),
  
  // Spots
  getSpots: (lotId: string) => 
    api.get(`/parking-lots/${lotId}/spots`),
  getSpotStatus: (spotId: string) => 
    api.get(`/spots/${spotId}/status`),
  updateSpot: (spotId: string, data: any) => 
    api.put(`/spots/${spotId}`, data),
  
  // Reservations
  createReservation: (data: {
    spotId: string;
    startTime: Date;
    endTime: Date;
  }) => api.post('/reservations', data),
  getUserReservations: () => 
    api.get('/reservations'),
  cancelReservation: (id: string) => 
    api.delete(`/reservations/${id}`),
  
  // Profile
  updateProfile: (data: {
    name?: string;
    licensePlate?: string;
  }) => api.patch('/profile', data),
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});