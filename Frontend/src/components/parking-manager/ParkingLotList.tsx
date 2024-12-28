import React, { useState, useEffect } from 'react';
import { ParkingLotCard } from './ParkingLotCard';
import { SpotGrid } from './SpotGrid';
import { ReservationModal } from './ReservationModal';
import api from '../../api/axios';
import type { ParkingLot, ParkingSpot } from '../../types';
import { Icons } from '../icons';

export function ParkingLotList() {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParkingLots = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/manager/parking-lots');
        console.log('Parking lots response:', response.data); // Add this line
        setParkingLots(response.data);
      } catch (err) {
        console.error('Error fetching parking lots:', err);
        setError('Failed to load parking lots');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchParkingLots();
  }, []);

  const handleReservation = async (duration: number) => {
    if (selectedSpot) {
      try {
        // Add your reservation API endpoint here when it's ready
        // await api.post('/api/reservations', {
        //   spotId: selectedSpot.id,
        //   duration: duration
        // });
        
        console.log(`Reserved spot ${selectedSpot.number} for ${duration} hours`);
        setSelectedSpot(null);
      } catch (err) {
        console.error('Error making reservation:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <Icons.Dashboard className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-blue-600 hover:text-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      {!selectedLot ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingLots.map((lot) => (
            <ParkingLotCard
              key={lot.id}
              lot={lot}
              onSelect={setSelectedLot}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selectedLot.name}</h2>
            <button
              onClick={() => setSelectedLot(null)}
              className="text-blue-600 hover:text-blue-700"
            >
              ← Back to lots
            </button>
          </div>
          <SpotGrid
            spots={selectedLot.spots}
            onSpotSelect={setSelectedSpot}
          />
        </div>
      )}

      {selectedSpot && (
        <ReservationModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
          onReserve={handleReservation}
        />
      )}
    </>
  );
}