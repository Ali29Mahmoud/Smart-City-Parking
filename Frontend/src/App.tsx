import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ParkingLotCard } from './components/ParkingLotCard';
import { SpotGrid } from './components/SpotGrid';
import { ReservationModal } from './components/ReservationModal';
import type { ParkingLot, ParkingSpot } from './types';

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
    <Layout>
      {!selectedLot ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Available Parking Lots</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockParkingLots.map((lot) => (
              <ParkingLotCard
                key={lot.id}
                lot={lot}
                onSelect={setSelectedLot}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{selectedLot.name}</h1>
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
    </Layout>
  );
}

export default App;