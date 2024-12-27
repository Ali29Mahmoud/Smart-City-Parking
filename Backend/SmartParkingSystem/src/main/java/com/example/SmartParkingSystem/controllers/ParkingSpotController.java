package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotBatchCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotCreateDTO;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotDTO;
import com.example.SmartParkingSystem.services.ParkingSpotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ParkingSpotController {
    private final ParkingSpotService parkingSpotService;

    public ParkingSpotController(ParkingSpotService parkingSpotService) {
        this.parkingSpotService = parkingSpotService;
    }

    @PostMapping(path = "/parking-spot")
    public ResponseEntity<Void> createParkingSpotById(@RequestBody ParkingSpotCreateDTO parkingSpotCreateDTO) {
        parkingSpotService.createParkingSpot(parkingSpotCreateDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/parking-spot/{id}")
    public ResponseEntity<ParkingSpotDTO> getParkingSpotById(@PathVariable Long id) {
        return ResponseEntity.ok(parkingSpotService.findById(id));
    }

    @GetMapping(path = "/parking-spot/{parkingLotId}")
    public ResponseEntity<List<ParkingSpotDTO>> getParkingSpotByParkingLotId(@PathVariable Long parkingLotId) {
        return ResponseEntity.ok(parkingSpotService.findAll(parkingLotId));
    }

    @PutMapping(path = "/parking-spot/")
    public ResponseEntity<Void> updateParkingSpotById(@RequestBody ParkingSpotDTO parkingSpotDTO) {
        parkingSpotService.updateParkingSpot(parkingSpotDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/parking-spots/batch")
    public ResponseEntity<Void> createMultipleParkingSpots(@RequestBody ParkingSpotBatchCreateDTO parkingSpotBatchCreateDTO) {
        parkingSpotService.createMultipleParkingSpots(parkingSpotBatchCreateDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/parking-spot/{id}")
    public ResponseEntity<Void> deleteParkingSpotById(@PathVariable Long id) {
        parkingSpotService.deleteParkingSpotById(id);
        return ResponseEntity.ok().build();
    }
}
