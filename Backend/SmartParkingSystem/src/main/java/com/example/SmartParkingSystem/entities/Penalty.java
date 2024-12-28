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
public class Penalty {
    private Long id;
    private Long reservationId;
    private BigDecimal amount;
    private String reason;
    private String status;
    private LocalDateTime createdAt;
}
