package com.example.SmartParkingSystem.services;


import com.example.SmartParkingSystem.models.daos.NotificationDAO;
import com.example.SmartParkingSystem.models.dtos.NotificationDTO;
import com.example.SmartParkingSystem.services.mappers.NotificationDTOMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationDAO notificationDAO;

    private final NotificationDTOMapper notificationDTOMapper;

    public void createNotification(NotificationDTO notificationDTO) {
        notificationDAO.createNotification(notificationDTOMapper.toEntity(notificationDTO));
    }

    public void getNotifications(int driverID) {
        // TODO implement here
    }

    public void markAsRead(int notificationID) {
        // TODO implement here
    }

    public void deleteNotification(int notificationID, int driverID) {
        // TODO implement here
    }

    public void deleteAllNotifications(int driverID) {
        // TODO implement here
    }


}
