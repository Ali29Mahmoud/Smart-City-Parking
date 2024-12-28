import axios from 'axios';
import { Notification } from '../types/notification';
import { getUserId, clearUserData } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:8081'
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Handle unauthorized access
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Notification endpoints
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const userId = getUserId();
    console.log('Attempting to get notifications for userId:', userId);
    
    
    const response = await api.get(`/api/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Detailed error in getNotifications:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      status: axios.isAxiosError(error) ? error.response?.status : null
    });
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearUserData();
      window.location.href = '/login';
    }
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: number): Promise<void> => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error('User not authenticated');
    
    await api.patch(`/api/notifications/${notificationId}`, {
      userId,
      isRead: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Add logout helper
export const logout = () => {
  clearUserData();
  window.location.href = '/login';
};

export default api;