package com.example.SmartParkingSystem.services.mappers;

import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotDTO;
import com.example.SmartParkingSystem.entities.ParkingLot;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ParkingLotMapper {

    public ParkingLotDTO toDTO(ParkingLot parkingLot) {
        return ParkingLotDTO.builder()
                .id(parkingLot.getId())
                .location(parkingLot.getLocation())
                .name(parkingLot.getName())
                .capacity(parkingLot.getCapacity())
                .availableSpots(parkingLot.getAvailableSpots())
                .basePrice(parkingLot.getBasePrice())
                .demandFactor(parkingLot.getDemandFactor())
                .evFactor(parkingLot.getEvFactor())
                .timeLimit(parkingLot.getTimeLimit())
                .createdAt(parkingLot.getCreatedAt())
                .updatedAt(parkingLot.getUpdatedAt())
                .build();
    }


    public ParkingLot toEntity(ParkingLotDTO parkingLotDTO) {
        return ParkingLot.builder()
                .id(parkingLotDTO.getId())
                .location(parkingLotDTO.getLocation())
                .name(parkingLotDTO.getName())
                .capacity(parkingLotDTO.getCapacity())
                .availableSpots(parkingLotDTO.getAvailableSpots())
                .basePrice(parkingLotDTO.getBasePrice())
                .demandFactor(parkingLotDTO.getDemandFactor())
                .evFactor(parkingLotDTO.getEvFactor())
                .timeLimit(parkingLotDTO.getTimeLimit())
                .createdAt(parkingLotDTO.getCreatedAt())
                .updatedAt(parkingLotDTO.getUpdatedAt())
                .build();
    }

    public List<ParkingLot> toEntities(List<ParkingLotDTO> parkingLotDTOs) {
        return parkingLotDTOs.stream().map(this::toEntity).toList();
    }

    public List<ParkingLotDTO> toDTOs(List<ParkingLot> parkingLots) {
        return parkingLots.stream().map(this::toDTO).toList();
    }
}
