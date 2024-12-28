package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.dtos.Penalty.PenaltyPaymentDTO;
import com.example.SmartParkingSystem.services.PenaltyPaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/penalty-payments")
public class PenaltyPaymentController {

    private final PenaltyPaymentService penaltyPaymentService;

    public PenaltyPaymentController(PenaltyPaymentService penaltyPaymentService) {
        this.penaltyPaymentService = penaltyPaymentService;
    }

    @PostMapping
    public ResponseEntity<Void> createPenaltyPayment(@RequestBody PenaltyPaymentDTO penaltyPaymentDTO) {
        try {
            penaltyPaymentService.createPenaltyPayment(penaltyPaymentDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PenaltyPaymentDTO> getPenaltyPaymentById(@PathVariable Long id) {
        Optional<PenaltyPaymentDTO> penaltyPayment = penaltyPaymentService.getPenaltyPaymentById(id);
        return penaltyPayment
                .map(payment -> new ResponseEntity<>(payment, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<PenaltyPaymentDTO>> getAllPenaltyPayments() {
        try {
            List<PenaltyPaymentDTO> penaltyPayments = penaltyPaymentService.getAllPenaltyPayments();
            return new ResponseEntity<>(penaltyPayments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/penalty/{penaltyId}")
    public ResponseEntity<List<PenaltyPaymentDTO>> getPenaltyPaymentsByPenaltyId(@PathVariable Long penaltyId) {
        try {
            List<PenaltyPaymentDTO> penaltyPayments = penaltyPaymentService.getPenaltyPaymentsByPenaltyId(penaltyId);
            return new ResponseEntity<>(penaltyPayments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePenaltyPayment(@PathVariable Long id) {
        try {
            penaltyPaymentService.deletePenaltyPayment(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}