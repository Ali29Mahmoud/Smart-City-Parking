package com.example.SmartParkingSystem.services.mappers;

import com.example.SmartParkingSystem.models.dtos.NotificationDTO;
import com.example.SmartParkingSystem.models.entities.Notification;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class NotificationDTOMapper {


    public Notification toEntity(NotificationDTO notificationDTO) {
        return Notification.builder()
                .id(notificationDTO.getId())
                .message(notificationDTO.getMessage())
                .driverId(notificationDTO.getDriverId())
                .type(notificationDTO.getType())
                .priority(notificationDTO.getPriority())
                .status(notificationDTO.getStatus())
                .build();
    }
    
    public List<Notification> toEntityList(List<NotificationDTO> notificationDTOList) {
        return notificationDTOList.stream().map(this::toEntity).toList();
    }
    
    public List<NotificationDTO> toDTOList(List<Notification> notificationList) {
        return notificationList.stream().map(this::toDTO).toList();
    }


    public NotificationDTO toDTO(Notification notification){
        return NotificationDTO.builder()
                .id(notification.getId())
                .driverId(notification.getDriverId())
                .message(notification.getMessage())
                .type(notification.getType())
                .status(notification.getStatus())
                .priority(notification.getPriority())
                .build();
    }
}
