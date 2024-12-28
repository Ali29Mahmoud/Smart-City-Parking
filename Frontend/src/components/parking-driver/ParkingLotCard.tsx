import React from "react";
import { Icons } from "../icons";
import type { ParkingLotDTO } from "../../types/ParkingLotDTO";

interface ParkingLotCardProps {
  lot: ParkingLotDTO;
  onSelect: (lot: ParkingLotDTO) => void;
}

export function ParkingLotCard({ lot, onSelect }: ParkingLotCardProps) {
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
          <p className="text-lg font-bold text-blue-600">
            {lot.timeLimit}H Max
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center">
          <Icons.Car className="h-5 w-5 text-gray-500 mr-1" />
          <span>
            {lot.availableSpots} / {lot.capacity} spots
          </span>
        </div>

        {/* Capacity percentage indicator */}
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                lot.availableSpots / lot.capacity > 0.5
                  ? "bg-green-600"
                  : lot.availableSpots / lot.capacity > 0.2
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
              style={{ width: `${(lot.availableSpots / lot.capacity) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSelect(lot)}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  );
}
