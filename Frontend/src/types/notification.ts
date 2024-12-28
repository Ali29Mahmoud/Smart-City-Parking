export interface Notification {
  id: number;
  driverId: number;
  message: string;
  timestamp: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'READ' | 'UNREAD';
  type: 'ALERT' | 'REMINDER' | 'PAYMENT';
}
