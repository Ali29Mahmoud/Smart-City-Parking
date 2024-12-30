package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.reservation.ReservationCreateDTO;
import com.example.SmartParkingSystem.dtos.reservation.ReservationDTO;
import com.example.SmartParkingSystem.entities.ReservationStatus;
import com.example.SmartParkingSystem.services.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationCreateDTO reservationCreateDTO) {
        try {
            boolean success = reservationService.createReservation(reservationCreateDTO);
            if (success) {
                return ResponseEntity.ok().body(Map.of(
                    "status", "success",
                    "message", "Reservation created successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Spot is not available for the selected time period"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationDTO reservationDTO) {
        if (!id.equals(reservationDTO.getId())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reservationService.updateReservation(reservationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservationById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByDriverId(@PathVariable Long driverId) {
        return ResponseEntity.ok(reservationService.findAllByDriverId(driverId));
    }

    @GetMapping("/spot/{spotId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsBySpotId(@PathVariable Long spotId) {
        return ResponseEntity.ok(reservationService.findAllBySpotId(spotId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByStatus(@PathVariable String status) {
        try {
            ReservationStatus reservationStatus = ReservationStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(reservationService.findAllByStatus(reservationStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/amount")
    public ResponseEntity<?> calculateReservationAmount(@RequestBody ReservationCreateDTO reservationCreateDTO) {
        try {
            BigDecimal amount = reservationService.calculateReservationAmount(reservationCreateDTO);
            return ResponseEntity.ok(amount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to calculate amount"
            ));
        }
    }

    @GetMapping("/spots/{spotId}/upcoming")
    public ResponseEntity<List<ReservationDTO>> getUpcomingReservations(@PathVariable Long spotId) {
        List<ReservationDTO> upcomingReservations = reservationService.getUpcomingReservations(spotId);
        return ResponseEntity.ok(upcomingReservations);
    }
}