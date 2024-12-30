export enum ReservationStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

export interface Reservation {
  id: number;
  driverId: number;
  spotId: number;
  status: ReservationStatus;
  checkIn: string | null;
  checkOut: string | null;
  scheduledCheckIn: string;
  scheduledCheckOut: string;
  amount: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}
