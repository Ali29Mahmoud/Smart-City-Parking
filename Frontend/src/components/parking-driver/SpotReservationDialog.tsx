import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Icons } from "../icons";
import { toast, Toaster } from "react-hot-toast";

interface ReservationDTO {
  scheduledCheckIn: string;
  scheduledCheckOut: string;
}

interface SpotReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  spotNumber: number;
  parkingLotId: number;
  spotId: number;
}

type PaymentMethod = "Cash" | "Visa" | "PayPal";

// Add this type for the API response
interface ReservationResponse {
  status: "success" | "error";
  message: string;
}

export function SpotReservationDialog({
  isOpen,
  onClose,
  spotNumber,
  parkingLotId,
  spotId,
}: SpotReservationDialogProps) {
  const [upcomingReservations, setUpcomingReservations] = useState<
    ReservationDTO[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add debounce for price calculation
  useEffect(() => {
    const calculatePrice = async () => {
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const currentDate = new Date();

        // Validate time period
        if (checkOutDate <= checkInDate) {
          setError("Check-out time must be after check-in time");
          setCalculatedPrice(null);
          return;
        }

        // Validate against current time
        if (checkInDate <= currentDate) {
          setError("Check-in time must be in the future");
          setCalculatedPrice(null);
          return;
        }

        setCalculating(true);
        try {
          const response = await fetch(
            "http://localhost:8081/api/reservations/amount",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                spotId: spotId,
                scheduledCheckIn: checkIn,
                scheduledCheckOut: checkOut,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to calculate price");
          }

          const data = await response.json();
          setCalculatedPrice(data);
          setError(null);
        } catch (err) {
          setError("Failed to calculate price");
          setCalculatedPrice(null);
        } finally {
          setCalculating(false);
        }
      } else {
        setCalculatedPrice(null);
      }
    };

    // Debounce the calculation to avoid too many requests
    const timeoutId = setTimeout(calculatePrice, 500);
    return () => clearTimeout(timeoutId);
  }, [checkIn, checkOut, spotId]);

  useEffect(() => {
    // Get driverId from localStorage when component mounts
    const driverId = localStorage.getItem("userId");
    console.log(driverId);
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8081/api/reservations/spots/${spotId}/upcoming`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load reservations");
      }

      const data = await response.json();
      setUpcomingReservations(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load reservations");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      fetchReservations();
    }
  }, [isOpen, spotId]);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const driverId = localStorage.getItem("userId");
      if (!driverId) {
        throw new Error("User not logged in");
      }

      const response = await fetch("http://localhost:8081/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          driverId: parseInt(driverId),
          spotId: spotId,
          scheduledCheckIn: checkIn,
          scheduledCheckOut: checkOut,
          paymentMethod: paymentMethod.toLowerCase(),
        }),
      });

      const data: ReservationResponse = await response.json();

      if (data.status === "error") {
        throw new Error(data.message);
      }

      toast.success(data.message);
      setCheckIn("");
      setCheckOut("");
      setCalculatedPrice(null);
      await fetchReservations();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create reservation";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "green",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "red",
            },
          },
        }}
      />
      <div className="fixed inset-0 top bg-black/50 flex items-center justify-center p-4 z-40">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all">
          <div className="p-6 flex justify-between items-start border-b sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Spot {spotNumber} Reservations
              </h2>
              <p className="text-gray-600 mt-1">
                View upcoming reservations or make a new one
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Reservations Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-gray-900">
                Upcoming Reservations
              </h3>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-red-600 text-center py-4 bg-red-50 rounded-md">
                  {error}
                </div>
              ) : upcomingReservations.length === 0 ? (
                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-md">
                  <p>No upcoming reservations</p>
                  <p className="text-sm mt-2">
                    Be the first to reserve this spot!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingReservations.map((reservation, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium text-gray-900">
                          {format(
                            new Date(reservation.scheduledCheckIn),
                            "MMM d, yyyy HH:mm"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium text-gray-900">
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

            {/* Reservation Form Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-gray-900">
                Make a Reservation
              </h3>
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Check-in Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Check-out Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as PaymentMethod)
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Visa">Visa</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                {calculating ? (
                  <div className="p-4 bg-blue-50 rounded-md animate-pulse">
                    <p className="text-sm text-blue-700">
                      Calculating price...
                    </p>
                  </div>
                ) : calculatedPrice ? (
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">Total Amount:</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${calculatedPrice.toFixed(2)}
                    </p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !calculatedPrice}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
                           transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed 
                           flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
