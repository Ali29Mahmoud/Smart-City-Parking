package com.example.SmartParkingSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PricingStructure {
    private BigDecimal basePrice;
    private BigDecimal demandFactor;
    private BigDecimal evFactor;
    private Integer availableSpots;
    private SpotType spotType;
}
