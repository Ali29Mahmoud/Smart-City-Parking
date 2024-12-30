export enum ReservationStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

export interface Reservation {
  id: string;
  location: string;
  name: string;
  spotNumber: number;
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
