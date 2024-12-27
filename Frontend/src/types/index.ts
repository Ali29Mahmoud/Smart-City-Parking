export type ParkingSpotType = 'regular' | 'disabled' | 'ev';
export type SpotStatus = 'available' | 'occupied' | 'reserved';
export type UserRole = 'driver' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  licensePlate?: string;
  paymentMethod?: string;
}

export interface ParkingSpot {
  id: string;
  lotId: string;
  number: string;
  type: ParkingSpotType;
  status: SpotStatus;
  price: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  location: string;
  capacity: number;
  spots: ParkingSpot[];
  basePrice: number;
  multiplier: number; // For dynamic pricing
}

export interface Reservation {
  id: string;
  userId: string;
  spotId: string;
  lotId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
  price: number;
}