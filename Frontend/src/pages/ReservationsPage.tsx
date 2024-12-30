import React, { useState, useEffect } from 'react';
import { Calendar } from '../components/reservations/Calendar';
import { DayReservations } from '../components/reservations/DayReservations';
import { format } from 'date-fns';

interface Reservation {
  id: number;
  spotId: number;
  scheduledCheckIn: string;
  scheduledCheckOut: string;
  status: string;
  amount: string;
}

export function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const driverId = localStorage.getItem('userId');
      const response = await fetch(
        `http://localhost:8081/api/reservations/driver/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      const data = await response.json();
      setReservations(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reservations');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Reservations</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Calendar 
              reservations={reservations}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
          <div>
            <DayReservations
              date={selectedDate}
              reservations={reservations.filter(reservation => {
                const reservationDate = new Date(reservation.scheduledCheckIn);
                return format(reservationDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              })}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 