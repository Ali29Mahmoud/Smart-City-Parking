import React from "react";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import { ReservationHistory } from "../components/profile/ReservationHistory";

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProfileInfo />
        <div className="lg:col-span-2 space-y-8">
          <ReservationHistory />
        </div>
      </div>
    </div>
  );
}
