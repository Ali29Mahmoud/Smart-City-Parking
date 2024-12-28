package com.example.SmartParkingSystem.models.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Statistic {

    private Integer freeSpots;
    private Integer occupiedSpots;
    private Integer reservedSpots;

    private Integer totalReservations;
    private Integer activeReservations;
    private Integer pendingReservations;
    private Integer completedReservations;
    private Integer noShowReservations;

    private Integer noPenaltyCount;
    private Integer withPenaltyCount;

    private Double totalRevenue;
    private Double totalPenalty;

}

