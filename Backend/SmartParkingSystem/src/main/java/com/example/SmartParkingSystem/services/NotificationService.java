package com.example.SmartParkingSystem.services;


import com.example.SmartParkingSystem.models.daos.NotificationDAO;
import com.example.SmartParkingSystem.models.dtos.NotificationDTO;
import com.example.SmartParkingSystem.services.mappers.NotificationDTOMapper;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationDAO notificationDAO;

    private final NotificationDTOMapper notificationDTOMapper;

    public void createNotification(NotificationDTO notificationDTO) {
        notificationDAO.createNotification(notificationDTOMapper.toEntity(notificationDTO));
    }

    public List<NotificationDTO> getNotifications(int driverID) {
        
        return notificationDTOMapper.toDTOList(notificationDAO.getNotifications(driverID));
    }

    public void markAsRead(int notificationID) {
        notificationDAO.markAsRead(notificationID);
    }

    public void deleteNotification(int notificationID) {
        notificationDAO.deleteNotification(notificationID);
    }

    public void deleteAllNotifications(int driverID) {
        notificationDAO.deleteAllNotifications(driverID);
    }
}
