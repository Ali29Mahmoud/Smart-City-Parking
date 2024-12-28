import React, { useState, useEffect } from "react";
import { ParkingLotCard } from "./ParkingLotCard";
import { ParkingSpotList } from "./ParkingSpotList";
import type { ParkingLotDTO } from "../../types/ParkingLotDTO";
import { ParkingSpotDTO } from "../../types/ParkingSpotDTO";
import { Icons } from "../icons";

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
    const fetchParkingLots = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/lots');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParkingLots(data);
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
