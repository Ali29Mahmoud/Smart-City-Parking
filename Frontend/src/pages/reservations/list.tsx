import React from 'react';
import { format } from 'date-fns';
import { Clock, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReservations } from '@/hooks/use-reservations';
import { formatPrice } from '@/lib/utils';

export const ReservationsList = () => {
  const { reservations, cancelReservation } = useReservations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Reservations</h1>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Spot {reservation.spotId}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Parking Lot Name</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {format(new Date(reservation.startTime), 'PPp')} -{' '}
                    {format(new Date(reservation.endTime), 'p')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">{formatPrice(reservation.price)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => cancelReservation(reservation.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};