package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ParkingLotDao;
import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotDTO;
import com.example.SmartParkingSystem.entities.ParkingLot;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingLotService {
    private final ParkingLotDao parkingLotDao;

    public ParkingLotService(ParkingLotDao parkingLotDao) {
        this.parkingLotDao = parkingLotDao;
    }

    public void createParkingLot(ParkingLotCreateDTO parkingLotDTO) {
        ParkingLot parkingLot = ParkingLot.builder()
                .location(parkingLotDTO.getLocation())
                .name(parkingLotDTO.getName())
                .capacity(parkingLotDTO.getCapacity())
                .availableSpots(parkingLotDTO.getCapacity())
                .basePrice(parkingLotDTO.getBasePrice())
                .reservationFactor(parkingLotDTO.getReservationFactor())
                .availableSpotsFactor(parkingLotDTO.getAvailableSpotsFactor())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .active(true)
                .build();
        parkingLotDao.create(parkingLot);
    }

    public ParkingLotDTO findById(Long id) {
        ParkingLot parkingLot = parkingLotDao.findById(id);
        return ParkingLotDTO.builder()
                .id(parkingLot.getId())
                .location(parkingLot.getLocation())
                .name(parkingLot.getName())
                .capacity(parkingLot.getCapacity())
                .availableSpots(parkingLot.getAvailableSpots())
                .basePrice(parkingLot.getBasePrice())
                .reservationFactor(parkingLot.getReservationFactor())
                .availableSpotsFactor(parkingLot.getAvailableSpotsFactor())
                .active(parkingLot.isActive())
                .createdAt(parkingLot.getCreatedAt())
                .updatedAt(parkingLot.getUpdatedAt())
                .build();

    }
    public void updateParkingLot(ParkingLotDTO parkingLotDTO) {
        ParkingLot parkingLot = ParkingLot.builder()
                .id(parkingLotDTO.getId())
                .location(parkingLotDTO.getLocation())
                .name(parkingLotDTO.getName())
                .capacity(parkingLotDTO.getCapacity())
                .availableSpots(parkingLotDTO.getAvailableSpots())
                .basePrice(parkingLotDTO.getBasePrice())
                .reservationFactor(parkingLotDTO.getReservationFactor())
                .availableSpotsFactor(parkingLotDTO.getAvailableSpotsFactor())
                .active(parkingLotDTO.isActive())
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
                        .reservationFactor(parkingLot.getReservationFactor())
                        .availableSpotsFactor(parkingLot.getAvailableSpotsFactor())
                        .active(parkingLot.isActive())
                        .createdAt(parkingLot.getCreatedAt())
                        .updatedAt(parkingLot.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}

