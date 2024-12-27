import React from 'react';
import { PlusCircle, Settings } from 'lucide-react';
import { ParkingLotGrid } from '@/components/parking/parking-lot-grid';
import { Button } from '@/components/ui/button';
import { useParking } from '@/hooks/use-parking';

export const ManagerDashboard = () => {
  const { managedLot, spots, updateSpot } = useParking();

  const handleSpotUpdate = async (spotId: string, data: any) => {
    try {
      await updateSpot(spotId, data);
    } catch (error) {
      console.error('Failed to update spot:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{managedLot?.name}</h1>
          <p className="text-gray-600">{managedLot?.location}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Add Spot</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ParkingLotGrid spots={spots} onSpotUpdate={handleSpotUpdate} />
      </div>
    </div>
  );
};