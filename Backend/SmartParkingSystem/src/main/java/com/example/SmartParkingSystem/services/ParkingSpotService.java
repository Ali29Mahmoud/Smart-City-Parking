package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ParkingSpotDao;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotBatchCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotDTO;
import com.example.SmartParkingSystem.entities.ParkingSpot;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingSpotService {
    private final ParkingSpotDao parkingSpotDao;

    public ParkingSpotService(ParkingSpotDao parkingSpotDao) {
        this.parkingSpotDao = parkingSpotDao;
    }

    public void createParkingSpot(ParkingSpotCreateDTO parkingSpotCreateDTO) {
        ParkingSpot parkingSpot = ParkingSpot.builder()
                .parkingLotId(parkingSpotCreateDTO.getParkingLotId())
                .spotNumber(parkingSpotCreateDTO.getSpotNumber())
                .size(parkingSpotCreateDTO.getSize())
                .type(parkingSpotCreateDTO.getType())
                .handicapped(parkingSpotCreateDTO.getHandicapped())
                .occupied(false)
                .build();
        parkingSpotDao.create(parkingSpot);
    }

    public void updateParkingSpot(ParkingSpotDTO parkingSpotDTO) {
        ParkingSpot parkingSpot = ParkingSpot.builder()
                .id(parkingSpotDTO.getId())
                .parkingLotId(parkingSpotDTO.getParkingLotId())
                .spotNumber(parkingSpotDTO.getSpotNumber())
                .size(parkingSpotDTO.getSize())
                .type(parkingSpotDTO.getType())
                .handicapped(parkingSpotDTO.getHandicapped())
                .occupied(parkingSpotDTO.getOccupied())
                .build();
        parkingSpotDao.update(parkingSpot);

    }

    public Optional<ParkingSpotDTO> findById(Long id) {
        Optional<ParkingSpot> parkingSpot = parkingSpotDao.findById(id);
        return parkingSpot.map(spot -> ParkingSpotDTO.builder()
                .id(spot.getId())
                .parkingLotId(spot.getParkingLotId())
                .spotNumber(spot.getSpotNumber())
                .size(spot.getSize())
                .type(spot.getType())
                .handicapped(spot.getHandicapped())
                .occupied(spot.getOccupied())
                .build());
    }

    public void deleteParkingSpotById(Long id) {
        parkingSpotDao.deleteById(id);
    }

    public List<ParkingSpotDTO> findAll(Long parkingLotId) {
        List<ParkingSpot> parkingSpots = parkingSpotDao.findAll(parkingLotId);
        return parkingSpots.stream()
                .map(parkingSpot -> ParkingSpotDTO.builder()
                        .id(parkingSpot.getId())
                        .parkingLotId(parkingSpot.getParkingLotId())
                        .spotNumber(parkingSpot.getSpotNumber())
                        .size(parkingSpot.getSize())
                        .type(parkingSpot.getType())
                        .handicapped(parkingSpot.getHandicapped())
                        .occupied(parkingSpot.getOccupied())
                        .build())
                .toList();
    }

    public void createMultipleParkingSpots(ParkingSpotBatchCreateDTO dto) {
        parkingSpotDao.createMultiple(dto.getParkingLotId(), dto.getSpotNumberStart(), dto.getSpotNumberEnd(),
                dto.getSize().toString(), dto.getType().toString(), dto.getHandicapped());
    }
}
