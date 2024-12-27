import React, { useState } from 'react';
import { Icons } from './icons';
import type { ParkingSpot } from '../types';

interface ReservationModalProps {
  spot: ParkingSpot;
  onClose: () => void;
  onReserve: (duration: number) => void;
}

export function ReservationModal({ spot, onClose, onReserve }: ReservationModalProps) {
  const [duration, setDuration] = useState(1);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reserve Spot {spot.number}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icons.Close className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
            <div className="mt-1 flex items-center">
              <Icons.Clock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="number"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Price</label>
            <div className="mt-1 flex items-center">
              <Icons.CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-blue-600">
                ${(spot.price * duration).toFixed(2)}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => onReserve(duration)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}