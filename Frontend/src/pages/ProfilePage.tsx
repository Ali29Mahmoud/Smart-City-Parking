import React, { Suspense } from "react";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import { ReservationHistory } from "../components/profile/ReservationHistory";

// Loading fallback component
const LoadingFallback = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-8 w-48 bg-gray-200 rounded"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="h-96 bg-gray-200 rounded-xl"></div>
      <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

export function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Section */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
            <ProfileInfo />
          </Suspense>
        </div>

        {/* Reservation History Section */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>}>
            <ReservationHistory />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
