package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotDTO;
import com.example.SmartParkingSystem.services.ParkingSpotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/spots")
public class ParkingSpotDriverController {
    private final ParkingSpotService parkingSpotService;

    public ParkingSpotDriverController(ParkingSpotService parkingSpotService) {
        this.parkingSpotService = parkingSpotService;
    }

    @GetMapping(path = "lot/{parkingLotId}")
    public ResponseEntity<List<ParkingSpotDTO>> getAllParkingSpotsByParkingLotId(@PathVariable Long parkingLotId) {
        return ResponseEntity.ok(parkingSpotService.findAll(parkingLotId));
    }
}
