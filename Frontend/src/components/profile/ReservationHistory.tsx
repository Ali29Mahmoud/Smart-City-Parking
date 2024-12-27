import React from 'react';
import { Icons } from '../icons';

const mockReservations = [
  {
    id: '1',
    lotName: 'Downtown Parking',
    spotNumber: 'A12',
    date: '2024-03-15',
    duration: '2 hours',
    price: 15.00,
    status: 'completed'
  },
  // Add more mock reservations as needed
];

export function ReservationHistory() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reservation History</h2>
      <div className="space-y-4">
        {mockReservations.map((reservation) => (
          <div key={reservation.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{reservation.lotName}</h3>
                <p className="text-sm text-gray-600">Spot {reservation.spotNumber}</p>
                <p className="text-sm text-gray-600">{reservation.date} • {reservation.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${reservation.price.toFixed(2)}</p>
                <span className="text-sm text-green-600 capitalize">{reservation.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}