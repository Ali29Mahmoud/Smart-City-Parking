package com.example.SmartParkingSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParkingSpot {
    private Long id;
    private Long parkingLotId;
    private Integer spotNumber;
    private SpotSize size;
    private SpotType type;
    private Boolean handicapped;
    private SpotStatus status;
}
