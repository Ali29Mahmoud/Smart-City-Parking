import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SpotGrid } from '@/components/parking/spot-grid';
import { Button } from '@/components/ui/button';
import type { ParkingSpot, ParkingLot } from '@/types';

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLot, setSelectedLot] = React.useState<ParkingLot | null>(null);
  
  // Mock data - replace with API calls
  const spots: ParkingSpot[] = [
    { id: '1', lotId: '1', number: 'A1', status: 'available', type: 'standard', price: 5 },
    { id: '2', lotId: '1', number: 'A2', status: 'occupied', type: 'standard', price: 5 },
    { id: '3', lotId: '1', number: 'A3', status: 'reserved', type: 'ev', price: 8 },
    // Add more spots...
  ];

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === 'available') {
      // Handle reservation
      console.log('Reserve spot:', spot);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Find Parking</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Available Spots</h2>
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-green-100" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-red-100" />
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-yellow-100" />
              <span>Reserved</span>
            </div>
          </div>
        </div>

        <SpotGrid spots={spots} onSpotClick={handleSpotClick} />
      </div>
    </div>
  );
};