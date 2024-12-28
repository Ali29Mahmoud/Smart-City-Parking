import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import type { ParkingSpotDTO } from "../../types/ParkingSpotDTO";

interface ParkingSpotListProps {
  parkingLotId: number;
  onSpotSelect: (spot: ParkingSpotDTO) => void;
}

export function ParkingSpotList({
  parkingLotId,
  onSpotSelect,
}: ParkingSpotListProps) {
  const [spots, setSpots] = useState<ParkingSpotDTO[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<ParkingSpotDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotDTO | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/spots/lot/${parkingLotId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch parking spots");
        }
        const data = await response.json();
        setSpots(data);
        setFilteredSpots(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load parking spots");
        setLoading(false);
      }
    };

    fetchSpots();
  }, [parkingLotId]);

  useEffect(() => {
    const filtered = spots.filter((spot) =>
      spot.spotNumber.toString().includes(searchQuery.trim())
    );
    setFilteredSpots(filtered);
  }, [searchQuery, spots]);

  const getSpotIcons = (spot: ParkingSpotDTO) => {
    const icons = [];

    if (spot.handicapped) {
      icons.push(<Icons.Accessible key="handicapped" className="h-6 w-6" />);
    }

    if (spot.type === "ELECTRIC") {
      icons.push(<Icons.EV key="electric" className="h-6 w-6" />);
    }

    if (icons.length === 0) {
      icons.push(<Icons.Car key="standard" className="h-6 w-6" />);
    }

    return <div className="flex gap-1">{icons}</div>;
  };

  const getSpotColor = (status: ParkingSpotDTO["status"]) => {
    switch (status) {
      case "FREE":
        return "bg-green-100 hover:bg-green-200 text-green-700";
      case "OCCUPIED":
        return "bg-red-100 hover:bg-red-200 text-red-700";
      case "RESERVED":
        return "bg-yellow-100 hover:bg-yellow-200 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSpotSizeLabel = (size: ParkingSpotDTO["size"]) => {
    switch (size) {
      case "REGULAR":
        return "R";
      case "LARGE":
        return "L";
      default:
        return "";
    }
  };

  const handleSpotClick = (spot: ParkingSpotDTO) => {
    setSelectedSpot(spot);
    onSpotSelect(spot);
  };

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
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons.Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search by spot number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status Legend */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm">Reserved</span>
        </div>
      </div>

      {/* Spots Grid */}
      {filteredSpots.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No spots found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
              className={`relative p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${getSpotColor(
                spot.status
              )}`}
            >
              {getSpotIcons(spot)}
              <span className="text-sm font-medium">
                Spot {spot.spotNumber}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-white/50 rounded">
                  {getSpotSizeLabel(spot.size)}
                </span>
                <span className="text-xs capitalize">
                  {spot.status.toLowerCase()}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedSpot && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Add spot details here if needed */}
        </div>
      )}
    </div>
  );
}
