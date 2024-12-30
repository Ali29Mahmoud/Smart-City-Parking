import React from 'react';
import { format } from 'date-fns';
import { Icons } from '../icons';

interface DayReservationsProps {
  date: Date;
  reservations: any[];
  loading: boolean;
  error: string | null;
}

export function DayReservations({ date, reservations, loading, error }: DayReservationsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 text-red-600">
          <Icons.AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 p-6 border-b">
        <div className="flex items-center space-x-2">
          <Icons.Calendar className="h-5 w-5 text-blue-600" />
          <span>{format(date, 'MMMM d, yyyy')}</span>
        </div>
      </h2>
      <div className="p-6">
        {reservations.length === 0 ? (
          <div className="text-center py-8">
            <Icons.Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No reservations for this day</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((reservation) => (
              <button
                key={reservation.id}
                className="w-full text-left p-4 rounded-lg transition-colors duration-150
                         hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                         border border-gray-100 hover:border-blue-200"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <Icons.MapPin className="h-4 w-4 text-blue-600" />
                      <p className="font-medium text-gray-900">Spot #{reservation.spotId}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Icons.Clock className="h-4 w-4" />
                      <p className="text-sm">
                        {format(new Date(reservation.scheduledCheckIn), 'HH:mm')} - {format(new Date(reservation.scheduledCheckOut), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1.5">
                    <p className="text-lg font-semibold text-blue-600">
                      ${reservation.amount}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${reservation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}
                    `}>
                      <span className={`h-1.5 w-1.5 rounded-full mr-1.5
                        ${reservation.status === 'PENDING' ? 'bg-yellow-400' :
                        reservation.status === 'ACTIVE' ? 'bg-green-400' :
                        reservation.status === 'COMPLETED' ? 'bg-blue-400' :
                        'bg-gray-400'}
                      `} />
                      {reservation.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 