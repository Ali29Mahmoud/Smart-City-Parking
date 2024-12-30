export enum NotificationType {
  REMINDER = "REMINDER",
  PAYMENT = "PAYMENT",
  ALERT = "ALERT",
}

export enum NotificationStatus {
  SENT = "SENT",
  READ = "READ",
}

export enum NotificationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Notification {
  id: number;
  driverId: number;
  message: string;
  createdAt: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  type: NotificationType;
}
