import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { ParkingLotCard } from '@/components/parking/parking-lot-card';
import { Button } from '@/components/ui/button';
import { useParking } from '@/hooks/use-parking';

export const DriverDashboard = () => {
  const { parkingLots, isLoading } = useParking();
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Find Parking</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search parking lots..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Near Me</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parkingLots?.map((lot) => (
          <ParkingLotCard key={lot.id} lot={lot} />
        ))}
      </div>
    </div>
  );
};