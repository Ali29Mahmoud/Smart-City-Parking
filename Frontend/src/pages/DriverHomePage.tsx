import React from "react";
import { ParkingLotList } from "../components/parking-manager/ParkingLotList";

export function DriverHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Parking Lots</h1>
      <ParkingLotList />
    </div>
  );
}
