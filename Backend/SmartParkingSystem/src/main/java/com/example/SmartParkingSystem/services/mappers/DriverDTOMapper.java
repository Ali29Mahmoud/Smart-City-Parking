package com.example.SmartParkingSystem.services.mappers;

import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
public class DriverDTOMapper implements Function<DriverDTO, User> {
    @Override
    public User apply(DriverDTO driverDTO) {
        return new User(
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

    public DriverDTO toDTO(User user) {
        return new DriverDTO(
                user.getId(),
                user.getEmail(),
                user.getHashedPassword(),
                user.getPhoneNumber(),
                user.getLicencePlate(),
                user.getName(),
                user.getHasUnpaidPenalties(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    public List<DriverDTO> toDTOs(List<User> users) {
        return users.stream().map(this::toDTO).toList();
    }
}