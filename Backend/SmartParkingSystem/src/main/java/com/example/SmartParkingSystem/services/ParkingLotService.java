package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ParkingLotDao;
import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotDTO;
import com.example.SmartParkingSystem.entities.ParkingLot;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingLotService {
    private final ParkingLotDao parkingLotDao;

    public ParkingLotService(ParkingLotDao parkingLotDao) {
        this.parkingLotDao = parkingLotDao;
    }

    public void createParkingLot(ParkingLotCreateDTO parkingLotCreateDTO) {
        ParkingLot parkingLot = ParkingLot.builder()
                .location(parkingLotCreateDTO.getLocation())
                .name(parkingLotCreateDTO.getName())
                .capacity(parkingLotCreateDTO.getCapacity())
                .availableSpots(parkingLotCreateDTO.getCapacity())
                .basePrice(parkingLotCreateDTO.getBasePrice())
                .demandFactor(parkingLotCreateDTO.getDemandFactor())
                .evFactor(parkingLotCreateDTO.getEvFactor())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .timeLimit(parkingLotCreateDTO.getTimeLimit())
                .build();
        parkingLotDao.create(parkingLot);
    }

    public ParkingLotDTO findById(Long id) {
        Optional<ParkingLot> parkingLot = parkingLotDao.findById(id);
        return parkingLot.map(
                lot -> ParkingLotDTO.builder()
                        .id(lot.getId())
                        .location(lot.getLocation())
                        .name(lot.getName())
                        .capacity(lot.getCapacity())
                        .availableSpots(lot.getAvailableSpots())
                        .basePrice(lot.getBasePrice())
                        .demandFactor(lot.getDemandFactor())
                        .evFactor(lot.getEvFactor())
                        .timeLimit(lot.getTimeLimit())
                        .createdAt(lot.getCreatedAt())
                        .updatedAt(lot.getUpdatedAt())
                        .build()
        ).orElse(null);
    }

    public void updateParkingLot(ParkingLotDTO parkingLotDTO) {
        ParkingLot parkingLot = ParkingLot.builder()
                .id(parkingLotDTO.getId())
                .location(parkingLotDTO.getLocation())
                .name(parkingLotDTO.getName())
                .capacity(parkingLotDTO.getCapacity())
                .availableSpots(parkingLotDTO.getAvailableSpots())
                .basePrice(parkingLotDTO.getBasePrice())
                .demandFactor(parkingLotDTO.getDemandFactor())
                .evFactor(parkingLotDTO.getEvFactor())
                .timeLimit(parkingLotDTO.getTimeLimit())
                .updatedAt(LocalDateTime.now())
                .build();
        parkingLotDao.update(parkingLot);
    }

    public void deleteParkingLotById(Long id) {
        parkingLotDao.deleteById(id);
    }

    public List<ParkingLotDTO> findAll() {
        List<ParkingLot> parkingLots = parkingLotDao.findAll();
        return parkingLots.stream()
                .map(parkingLot -> ParkingLotDTO.builder()
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
                        .build())
                .collect(Collectors.toList());
    }
}

