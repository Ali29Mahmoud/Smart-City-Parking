export interface ParkingLotDTO {
  id: number;
  location: string;
  name: string;
  capacity: number;
  availableSpots: number;
  basePrice: number;
  demandFactor: number;
  evFactor: number;
  timeLimit: number;
  createdAt: string;
  updatedAt: string;
}
