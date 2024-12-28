import React from "react";
import { Icons } from "../components/icons";
import { ParkingLotList } from "../components/parking-driver/ParkingLotList";

export function LotsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="border-b pb-6">
          <div className="flex items-center gap-3">
            <Icons.ParkingCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Available Parking Lots</h1>
          </div>
          <p className="mt-3 text-gray-600">
            Browse through our available parking lots and find the perfect spot
            for your vehicle. Select a parking lot to view more details and
            available spaces.
          </p>
        </div>

        <ParkingLotList />
      </div>
    </div>
  );
}
