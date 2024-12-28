package com.example.SmartParkingSystem.dtos.parkingLot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParkingLotCreateDTO {

    private String location;
    private String name;
    private Integer capacity;
    private BigDecimal basePrice;
    private BigDecimal demandFactor;
    private BigDecimal evFactor;
    private Integer timeLimit;
}
