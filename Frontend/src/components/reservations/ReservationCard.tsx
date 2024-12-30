import React from "react";
import { format } from "date-fns";
import { Icons } from "../icons";
import { Reservation, ReservationStatus } from "../../types/Reservation";

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case ReservationStatus.ACTIVE:
        return "bg-blue-100 text-blue-800";
      case ReservationStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case ReservationStatus.NO_SHOW:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div className="space-y-4 flex-1">
          <div className="flex items-center space-x-2">
            <Icons.MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Spot #{reservation.spotId}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Check-in</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icons.Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {format(new Date(reservation.scheduledCheckIn), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {format(new Date(reservation.scheduledCheckIn), "HH:mm")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Check-out</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icons.Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {format(new Date(reservation.scheduledCheckOut), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {format(new Date(reservation.scheduledCheckOut), "HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right space-y-3">
          <p className="text-xl font-semibold text-blue-600">
            ${reservation.amount}
          </p>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${getStatusColor(reservation.status)}`}
          >
            {reservation.status}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icons.CreditCard className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {reservation.paymentMethod}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            Transaction ID: {reservation.transactionId}
          </span>
        </div>
      </div>
    </div>
  );
}
