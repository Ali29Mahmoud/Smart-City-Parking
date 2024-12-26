package com.example.SmartParkingSystem.models.entities;


import com.example.SmartParkingSystem.models.enums.NotificationPriority;
import com.example.SmartParkingSystem.models.enums.NotificationStatus;
import com.example.SmartParkingSystem.models.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Builder
@Data
public class Notification {
    private Integer id;
    private Integer driverId;
    private String message;
    private LocalDateTime createdAt;
    private NotificationPriority priority;
    private NotificationStatus status;
    private NotificationType type;
}
