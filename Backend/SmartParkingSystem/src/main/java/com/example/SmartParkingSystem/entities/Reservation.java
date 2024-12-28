package com.example.SmartParkingSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reservation {
    private Long id;
    private Integer driverId;
    private Integer spotId;
    private ReservationStatus status;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private LocalDateTime scheduledCheckIn;
    private LocalDateTime scheduledCheckOut;
    private BigDecimal amount;
    private String paymentMethod;
    private String transactionId;
    private LocalDateTime createdAt;
}
