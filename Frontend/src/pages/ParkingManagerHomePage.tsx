import React, { useState } from "react";
import { ParkingLotList } from "../components/parking-manager/ParkingLotList";
import { CreateParkingLotForm } from "../components/parking-manager/CreateParkingLotForm";
import { Icons } from "../components/icons";

export function ParkingManagerHomePage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Parking Lots</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Icons.Plus className="h-5 w-5" />
          Create New Lot
        </button>
      </div>

      <ParkingLotList />

      {showCreateForm && (
        <CreateParkingLotForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
