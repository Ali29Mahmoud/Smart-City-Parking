package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.Penalty.PenaltyDTO;
import com.example.SmartParkingSystem.services.PenaltyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/penalties")
public class PenaltyController {

    private final PenaltyService penaltyService;

    public PenaltyController(PenaltyService penaltyService) {
        this.penaltyService = penaltyService;
    }

    @PostMapping
    public ResponseEntity<Void> createPenalty(@RequestBody PenaltyDTO penaltyDTO) {
        try {
            penaltyService.createPenalty(penaltyDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PenaltyDTO> getPenaltyById(@PathVariable Long id) {
        return penaltyService.getPenaltyById(id)
                .map(penalty -> new ResponseEntity<>(penalty, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<PenaltyDTO>> getAllPenalties() {
        List<PenaltyDTO> penalties = penaltyService.getAllPenalties();
        return new ResponseEntity<>(penalties, HttpStatus.OK);
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<PenaltyDTO>> getPenaltiesByReservationId(@PathVariable Long reservationId) {
        List<PenaltyDTO> penalties = penaltyService.getPenaltiesByReservationId(reservationId);
        return new ResponseEntity<>(penalties, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PenaltyDTO>> getPenaltiesByUserId(@PathVariable Long userId) {
        List<PenaltyDTO> penalties = penaltyService.getPenaltiesByUserId(userId);
        return new ResponseEntity<>(penalties, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updatePenaltyStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            penaltyService.updatePenaltyStatus(id, status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePenalty(@PathVariable Long id) {
        try {
            penaltyService.deletePenalty(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}