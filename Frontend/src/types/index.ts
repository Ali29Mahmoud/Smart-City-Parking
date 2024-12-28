export type UserRole = "driver" | "manager" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  licensePlate?: string;
  paymentMethod?: string;
}
