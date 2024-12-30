import React, { useState, useEffect } from "react";
import { ReservationCard } from "../reservations/ReservationCard";
import { Reservation } from "../../types/Reservation";
import { Icons } from "../icons";

export function ReservationHistory() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const driverId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:8081/api/reservations/driver/${driverId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load reservation history");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Reservation History</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <Icons.AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Reservation History
        </h2>
        <span className="text-sm text-gray-500">
          {reservations.length}{" "}
          {reservations.length === 1 ? "reservation" : "reservations"}
        </span>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <Icons.Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reservations found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white rounded-lg transition-colors duration-150 hover:bg-blue-100
                         focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-100
                         border border-gray-100 hover:border-blue-200"
            >
              <ReservationCard reservation={reservation} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
