export interface ParkingSpotDTO {
  id: number;
  parkingLotId: number;
  spotNumber: number;
  size: "REGULAR" | "LARGE";
  type: "GAS" | "ELECTRIC";
  handicapped: boolean;
  status: "FREE" | "OCCUPIED" | "RESERVED";
}
