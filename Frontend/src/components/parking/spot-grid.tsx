import React from 'react';
import { Square, Car, Zap } from 'lucide-react';
import { ParkingSpot } from '@/types';
import { cn, formatPrice } from '@/lib/utils';

interface SpotGridProps {
  spots: ParkingSpot[];
  onSpotClick: (spot: ParkingSpot) => void;
}

export const SpotGrid = ({ spots, onSpotClick }: SpotGridProps) => {
  const getSpotIcon = (type: ParkingSpot['type']) => {
    switch (type) {
      case 'ev':
        return <Zap className="h-5 w-5" />;
      case 'handicap':
        return <Square className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {spots.map((spot) => (
        <button
          key={spot.id}
          onClick={() => onSpotClick(spot)}
          className={cn(
            'p-4 rounded-lg flex flex-col items-center justify-center space-y-2',
            'transition-colors duration-200',
            {
              'bg-green-100 hover:bg-green-200': spot.status === 'available',
              'bg-red-100 cursor-not-allowed': spot.status === 'occupied',
              'bg-yellow-100': spot.status === 'reserved',
            }
          )}
          disabled={spot.status === 'occupied'}
        >
          {getSpotIcon(spot.type)}
          <span className="font-medium">{spot.number}</span>
          <span className="text-sm text-gray-600">{formatPrice(spot.price)}/hr</span>
        </button>
      ))}
    </div>
  );
};