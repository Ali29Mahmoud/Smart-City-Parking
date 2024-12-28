import React, { useState, useEffect } from "react";
import { ParkingLotCard } from "./ParkingLotCard";
import { ParkingSpotList } from "./ParkingSpotList";
import type { ParkingLotDTO } from "../../types/ParkingLotDTO";
import { ParkingSpotDTO } from "../../types/ParkingSpotDTO";
import { Icons } from "../icons";

// Mock data matching the DTO structure
const mockParkingLots: ParkingLotDTO[] = [
  {
    id: 1,
    name: "Downtown Parking",
    location: "123 Main St",
    capacity: 100,
    availableSpots: 65,
    basePrice: 5.0,
    demandFactor: 1.2,
    evFactor: 1.5,
    timeLimit: 24,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Shopping Mall Parking",
    location: "456 Market Ave",
    capacity: 200,
    availableSpots: 50,
    basePrice: 3.5,
    demandFactor: 1.1,
    evFactor: 1.3,
    timeLimit: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock parking lots as needed
];

export function ParkingLotList() {
  const [parkingLots, setParkingLots] = useState<ParkingLotDTO[]>([]);
  const [selectedLot, setSelectedLot] = useState<ParkingLotDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSpotSelect = (spot: ParkingSpotDTO) => {
    // Handle spot selection (e.g., navigate to reservation page)
    console.log("Selected spot:", spot);
  };

  useEffect(() => {
    // Simulating API call
    const fetchParkingLots = async () => {
      try {
        // In real implementation, this would be an API call
        // const response = await fetch('/api/parking-lots');
        // const data = await response.json();

        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setParkingLots(mockParkingLots);
        setLoading(false);
      } catch (err) {
        setError("Failed to load parking lots");
        setLoading(false);
      }
    };

    fetchParkingLots();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
    <div className="container mx-auto px-4 py-8">
      {!selectedLot ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingLots.map((lot) => (
            <ParkingLotCard key={lot.id} lot={lot} onSelect={setSelectedLot} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedLot.name}</h2>
              <p className="text-gray-600">{selectedLot.location}</p>
            </div>
            <button
              onClick={() => setSelectedLot(null)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <Icons.ArrowLeft className="h-4 w-4" />
              Back to lots
            </button>
          </div>

          <ParkingSpotList
            parkingLotId={selectedLot.id}
            onSpotSelect={handleSpotSelect}
          />
        </div>
      )}
    </div>
  );
}
