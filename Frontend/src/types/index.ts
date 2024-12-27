export type User = {
  id: string;
  email: string;
  name: string;
  role: 'driver' | 'manager' | 'admin';
  licensePlate?: string;
};

export type ParkingSpot = {
  id: string;
  lotId: string;
  number: string;
  status: 'available' | 'occupied' | 'reserved';
  type: 'standard' | 'handicap' | 'ev';
  price: number;
};

export type ParkingLot = {
  id: string;
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  occupancyRate: number;
};

export type Reservation = {
  id: string;
  userId: string;
  spotId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
  price: number;
};