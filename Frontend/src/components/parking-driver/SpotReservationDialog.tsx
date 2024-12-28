import React, { useState } from "react";
import { format } from "date-fns";
import { Icons } from "../icons";

interface ReservationDTO {
  scheduledCheckIn: string;
  scheduledCheckOut: string;
}

interface SpotReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  spotNumber: number;
  parkingLotId: number;
}

export function SpotReservationDialog({
  isOpen,
  onClose,
  spotNumber,
  parkingLotId,
}: SpotReservationDialogProps) {
  const [upcomingReservations, setUpcomingReservations] = useState<ReservationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New state for form
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  React.useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        // In real implementation, replace with actual API call
        // const response = await fetch(`/api/parking-lots/${parkingLotId}/spots/${spotNumber}/reservations`);
        // const data = await response.json();

        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockReservations: ReservationDTO[] = [
          {
            scheduledCheckIn: new Date(2024, 3, 20, 10, 0).toISOString(),
            scheduledCheckOut: new Date(2024, 3, 20, 14, 0).toISOString(),
          },
          {
            scheduledCheckIn: new Date(2024, 3, 21, 9, 0).toISOString(),
            scheduledCheckOut: new Date(2024, 3, 21, 17, 0).toISOString(),
          },
        ];
        setUpcomingReservations(mockReservations);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reservations");
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchReservations();
    }
  }, [isOpen, parkingLotId, spotNumber]);

  const handleCalculatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    try {
      // In real implementation, this would be an API call
      // const response = await fetch('/api/calculate-price', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     parkingLotId,
      //     spotNumber,
      //     scheduledCheckIn: checkIn,
      //     scheduledCheckOut: checkOut,
      //   })
      // });
      // const data = await response.json();

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCalculatedPrice(25.50); // Mock price
    } catch (err) {
      setError("Failed to calculate price");
    } finally {
      setCalculating(false);
    }
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In real implementation, this would be an API call
      // const response = await fetch('/api/reservations', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     parkingLotId,
      //     spotNumber,
      //     scheduledCheckIn: checkIn,
      //     scheduledCheckOut: checkOut,
      //     userId: getCurrentUserId(), // Get from auth context
      //   })
      // });

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
      // You might want to show a success toast here
    } catch (err) {
      setError("Failed to create reservation");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 flex justify-between items-start border-b">
          <div>
            <h2 className="text-xl font-semibold">
              Spot {spotNumber} Reservations
            </h2>
            <p className="text-gray-600">
              View upcoming reservations or make a new one
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Reservations Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Upcoming Reservations</h3>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-4">{error}</div>
            ) : upcomingReservations.length === 0 ? (
              <p className="text-gray-500">No upcoming reservations</p>
            ) : (
              <div className="space-y-2">
                {upcomingReservations.map((reservation, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span className="font-medium">
                        {format(
                          new Date(reservation.scheduledCheckIn),
                          "MMM d, yyyy HH:mm"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Check-out:</span>
                      <span className="font-medium">
                        {format(
                          new Date(reservation.scheduledCheckOut),
                          "MMM d, yyyy HH:mm"
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Updated Reservation Form Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Make a Reservation</h3>
            <form onSubmit={calculatedPrice ? handleReservation : handleCalculatePrice} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Check-out Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              {calculatedPrice && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">Calculated Price:</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ${calculatedPrice.toFixed(2)}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={calculating}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {calculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Calculating...
                  </>
                ) : calculatedPrice ? (
                  'Confirm Reservation'
                ) : (
                  'Calculate Price'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
