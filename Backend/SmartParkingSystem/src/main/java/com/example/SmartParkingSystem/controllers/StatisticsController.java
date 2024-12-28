package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotDTO;
import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.Statistic;
import com.example.SmartParkingSystem.services.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/lot/{lotId}")
    public ResponseEntity<Statistic> getLotStatistics(@PathVariable Long lotId) {
        Statistic statistic = statisticsService.calculateLotStatistics(lotId);
        return ResponseEntity.ok(statistic);
    }

    @GetMapping("/top-reservations")
    public ResponseEntity<List<ParkingLotDTO>> getTop10ParkingLotsWithMostReservations() {
        List<ParkingLotDTO> parkingLots = statisticsService.getTop10ParkingLotsWithMostReservations();
        return ResponseEntity.ok(parkingLots);
    }

    @GetMapping("/top-revenues")
    public ResponseEntity<List<ParkingLotDTO>> getTop10ParkingLotsWithMostRevenue() {
        List<ParkingLotDTO> parkingLots = statisticsService.getTop10ParkingLotsWithMostRevenue();
        return ResponseEntity.ok(parkingLots);
    }

    @GetMapping("/top-users")
    public ResponseEntity<List<DriverDTO>> getTop10ReservingUsers() {
        List<DriverDTO> drivers = statisticsService.getTop10ReservingUsers();
        return ResponseEntity.ok(drivers);
    }
}
