import React from 'react';
import { Icons } from '../icons';
import type { ParkingSpot } from '../../types';

interface SpotGridProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

export function SpotGrid({ spots, onSpotSelect }: SpotGridProps) {
  const getSpotIcon = (type: ParkingSpot['type']) => {
    switch (type) {
      case 'ev':
        return <Icons.EV className="h-6 w-6" />;
      case 'disabled':
        return <Icons.Accessible className="h-6 w-6" />;
      default:
        return <Icons.Car className="h-6 w-6" />;
    }
  };

  const getSpotColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 hover:bg-green-200 text-green-700';
      case 'occupied':
        return 'bg-red-100 text-red-700 cursor-not-allowed';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-700 cursor-not-allowed';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {spots.map((spot) => (
        <button
          key={spot.id}
          onClick={() => spot.status === 'available' && onSpotSelect(spot)}
          disabled={spot.status !== 'available'}
          className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${getSpotColor(
            spot.status
          )}`}
        >
          {getSpotIcon(spot.type)}
          <span className="text-sm font-medium">{spot.number}</span>
          <span className="text-xs capitalize">{spot.status}</span>
        </button>
      ))}
    </div>
  );
}