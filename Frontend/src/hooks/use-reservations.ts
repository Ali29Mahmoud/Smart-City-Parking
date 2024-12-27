import { useState, useEffect } from 'react';
import { parkingApi } from '@/services/api';
import type { Reservation } from '@/types';
import { toast } from 'react-toastify';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const response = await parkingApi.getUserReservations();
      setReservations(response.data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelReservation = async (id: string) => {
    try {
      await parkingApi.cancelReservation(id);
      setReservations(reservations.filter(r => r.id !== id));
      toast.success('Reservation cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
      toast.error('Failed to cancel reservation');
    }
  };

  return {
    reservations,
    isLoading,
    cancelReservation,
  };
}