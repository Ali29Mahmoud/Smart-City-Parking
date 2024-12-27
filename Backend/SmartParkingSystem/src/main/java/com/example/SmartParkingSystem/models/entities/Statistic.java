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

    private int numberOfParkingSpots;
    private int numberOfFreeSpots;
    private int numberOfOccupiedSpots;
    private int numberOfHandicappedSpots;
    private int numberOfSmallSpots;
    private int numberOfMediumSpots;
    private int numberOfLargeSpots;
    private int numberOfReservations;

    private int numberOfPenalties;
    private int numberOfUnpaidPenalties;


}
