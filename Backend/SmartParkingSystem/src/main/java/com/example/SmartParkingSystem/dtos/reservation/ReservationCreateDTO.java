package com.example.SmartParkingSystem.dtos.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationCreateDTO {
    private Integer driverId;
    private Integer spotId;
    private LocalDateTime scheduledCheckIn;
    private LocalDateTime scheduledCheckOut;
    private String amount;
    private String paymentMethod;
    private String transactionId;
}
