import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Car } from 'lucide-react';
import { ParkingLot } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ParkingLotCardProps {
  lot: ParkingLot;
}

export const ParkingLotCard = ({ lot }: ParkingLotCardProps) => {
  return (
    <Link to={`/lots/${lot.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{lot.name}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{lot.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Car className="h-5 w-5 text-blue-600" />
              <span className="ml-1 text-sm font-medium">
                {lot.availableSpots}/{lot.totalSpots}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Starting from</span>
              <span className="font-medium">{formatPrice(5)}/hr</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${lot.occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};