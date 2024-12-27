// Centralize icon imports to avoid duplication and make updates easier
import { 
  Car,
  User, 
  LayoutDashboard,
  LogOut,
  MapPin,
  BatteryCharging, // Changed from Battery
  Accessibility, // Changed from Wheelchair
  X,
  Clock,
  CreditCard
} from 'lucide-react';

export const Icons = {
  Car,
  User,
  Dashboard: LayoutDashboard,
  LogOut,
  MapPin,
  EV: BatteryCharging,
  Accessible: Accessibility,
  Close: X,
  Clock,
  CreditCard
};