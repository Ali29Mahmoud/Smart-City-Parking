package com.example.SmartParkingSystem.models.dtos;

import com.example.SmartParkingSystem.models.enums.NotificationPriority;
import com.example.SmartParkingSystem.models.enums.NotificationStatus;
import com.example.SmartParkingSystem.models.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder

public class NotificationDTO {
    private Integer id;
    private Integer driverId;
    private String message;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private NotificationPriority priority;
    private NotificationStatus status;
    private NotificationType type;
}

/*
 * Example JSON:
 * {
 * "id": 1,
 * "driverId": 100,
 * "message": "Your parking session will expire in 15 minutes",
 * "createdAt": "2024-03-20 14:30:00",
 * "priority": "HIGH",
 * "status": "UNREAD",
 * "type": "PARKING_EXPIRY"
 * }
 */