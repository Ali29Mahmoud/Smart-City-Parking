import { useState, useEffect } from 'react';
import { parkingApi } from '@/services/api';
import type { ParkingLot, ParkingSpot } from '@/types';

export function useParking() {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [managedLot, setManagedLot] = useState<ParkingLot | null>(null);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadParkingLots();
  }, []);

  const loadParkingLots = async () => {
    try {
      const response = await parkingApi.getParkingLots();
      setParkingLots(response.data);
    } catch (error) {
      console.error('Failed to load parking lots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSpot = async (spotId: string, data: any) => {
    try {
      await parkingApi.updateSpot(spotId, data);
      // Refresh spots after update
      if (managedLot) {
        const response = await parkingApi.getSpots(managedLot.id);
        setSpots(response.data);
      }
    } catch (error) {
      console.error('Failed to update spot:', error);
      throw error;
    }
  };

  return {
    parkingLots,
    managedLot,
    spots,
    isLoading,
    updateSpot,
  };
}