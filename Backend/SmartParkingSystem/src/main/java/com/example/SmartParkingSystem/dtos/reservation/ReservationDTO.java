package com.example.SmartParkingSystem.dtos.reservation;

import com.example.SmartParkingSystem.entities.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationDTO {
    private Long id;
    private Integer driverId;
    private Integer spotId;
    private ReservationStatus status;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private LocalDateTime scheduledCheckIn;
    private LocalDateTime scheduledCheckOut;
    private String amount;
    private String paymentMethod;
    private String transactionId;
    private LocalDateTime createdAt;
}
