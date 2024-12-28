package com.example.SmartParkingSystem.dtos.Penalty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PenaltyPaymentDTO {
    private Long id;
    private Long penaltyId;
    private String paymentMethod;
    private String transactionId;
    private LocalDateTime createdAt;
}
