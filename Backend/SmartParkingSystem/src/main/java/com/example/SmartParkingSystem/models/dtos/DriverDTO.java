package com.example.SmartParkingSystem.models.dtos;

import java.time.LocalDate;
public record DriverDTO(Integer id, String email,
                        String hashedPassword, String phoneNumber, String licencePlate,
                        String name, Boolean hasUnpaidPenalties, LocalDate createdAt,
                        LocalDate updatedAt) {
}
