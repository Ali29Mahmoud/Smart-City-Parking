package com.example.SmartParkingSystem.controllers;


import com.example.SmartParkingSystem.models.dtos.NotificationDTO;
import com.example.SmartParkingSystem.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;


    @PostMapping("")
    public ResponseEntity<String> createNotification(@RequestBody NotificationDTO notificationDTO) {

        notificationService.createNotification(notificationDTO);
        return ResponseEntity.ok("Notification created successfully");
    }

    @GetMapping("/{driverID}")
    public ResponseEntity<List<NotificationDTO>> getNotifications(@PathVariable int driverID) {
        return ResponseEntity.ok(notificationService.getNotifications(driverID));
    }

    @PutMapping("/markAsRead/{notificationID}")
    public ResponseEntity<String> markAsRead(@PathVariable int notificationID) {
        notificationService.markAsRead(notificationID);
        return ResponseEntity.ok("Notification marked as read successfully");
    }

    @DeleteMapping("/{notificationID}/{driverID}")
    public ResponseEntity<String> deleteNotification(@PathVariable int notificationID, @PathVariable int driverID) {
        notificationService.deleteNotification(notificationID);
        return ResponseEntity.ok("Notification deleted successfully");
    }

    @DeleteMapping("/all/{driverID}")
    public ResponseEntity<String> deleteAllNotifications(@PathVariable int driverID) {
        notificationService.deleteAllNotifications(driverID);
        return ResponseEntity.ok("All notifications deleted successfully");
    }
 

}
