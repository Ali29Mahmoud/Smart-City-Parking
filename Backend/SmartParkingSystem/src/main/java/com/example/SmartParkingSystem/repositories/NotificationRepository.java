package com.example.SmartParkingSystem.repositories;

import com.example.SmartParkingSystem.models.entities.Notification;
import com.example.SmartParkingSystem.models.enums.NotificationPriority;
import com.example.SmartParkingSystem.models.enums.NotificationType;

import java.util.List;

public interface NotificationRepository {

     void createNotification(Notification notification);

     void markAsRead(Integer notificationId);


     void deleteNotification(Integer notificationId);

     void deleteAllNotifications(Integer driverId);

     List<Notification> getUnreadNotifications(Integer driverId);

     List<Notification> getNotificationsByType(Integer driverId, NotificationType type);

     List<Notification> getNotificationsByPriority(Integer driverId, NotificationPriority priority);





}
