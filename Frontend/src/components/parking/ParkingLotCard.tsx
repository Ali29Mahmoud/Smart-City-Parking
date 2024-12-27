import React from 'react';
import { Icons } from '../icons';
import type { ParkingLot } from '../../types';

interface ParkingLotCardProps {
  lot: ParkingLot;
  onSelect: (lot: ParkingLot) => void;
}

export function ParkingLotCard({ lot, onSelect }: ParkingLotCardProps) {
  const availableSpots = lot.spots.filter(spot => spot.status === 'available').length;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{lot.name}</h3>
          <div className="flex items-center text-gray-600 mt-2">
            <Icons.MapPin className="h-4 w-4 mr-2" />
            <span>{lot.location}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${lot.basePrice}/hr</p>
          <p className="text-sm text-gray-500">Dynamic pricing applied</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center">
          <Icons.Car className="h-5 w-5 text-gray-500 mr-1" />
          <span>{availableSpots} spots</span>
        </div>
        <div className="flex items-center">
          <Icons.EV className="h-5 w-5 text-gray-500 mr-1" />
          <span>EV Charging</span>
        </div>
        <div className="flex items-center">
          <Icons.Accessible className="h-5 w-5 text-gray-500 mr-1" />
          <span>Accessible</span>
        </div>
      </div>
      
      <button
        onClick={() => onSelect(lot)}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View & Reserve
      </button>
    </div>
  );
}