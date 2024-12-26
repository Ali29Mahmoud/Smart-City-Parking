package com.example.SmartParkingSystem.services.mappers;

import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.Driver;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DriverDTOMapper implements Function<DriverDTO, Driver> {
    @Override
    public Driver apply(DriverDTO driverDTO) {
        return new Driver(
                driverDTO.id(),
                driverDTO.email(),
                driverDTO.hashedPassword(),
                driverDTO.phoneNumber(),
                driverDTO.licencePlate(),
                driverDTO.name(),
                driverDTO.hasUnpaidPenalties(),
                driverDTO.createdAt(),
                driverDTO.updatedAt()
        );
    }
}