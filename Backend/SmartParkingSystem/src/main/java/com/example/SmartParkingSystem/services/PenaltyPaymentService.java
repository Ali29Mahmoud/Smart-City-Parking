package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.PenaltyPaymentDAO;
import com.example.SmartParkingSystem.dtos.Penalty.PenaltyPaymentDTO;
import com.example.SmartParkingSystem.entities.PenaltyPayment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PenaltyPaymentService {

    private final PenaltyPaymentDAO penaltyPaymentDAO;

    public PenaltyPaymentService(PenaltyPaymentDAO penaltyPaymentDAO) {
        this.penaltyPaymentDAO = penaltyPaymentDAO;
    }

    // Create a new penalty payment
    public void createPenaltyPayment(PenaltyPaymentDTO paymentDTO) {
        PenaltyPayment penaltyPayment = PenaltyPayment.builder()
                .id(paymentDTO.getId())
                .penaltyId(paymentDTO.getPenaltyId())
                .paymentMethod(paymentDTO.getPaymentMethod())
                .transactionId(paymentDTO.getTransactionId())
                .createdAt(paymentDTO.getCreatedAt())
                .build();

        penaltyPaymentDAO.createPenaltyPayment(penaltyPayment);
    }

    // Get a penalty payment by ID
    public Optional<PenaltyPaymentDTO> getPenaltyPaymentById(Long id) {
        Optional<PenaltyPayment> penaltyPayment = penaltyPaymentDAO.getPenaltyPaymentById(id);
        return penaltyPayment.map(p -> PenaltyPaymentDTO.builder()
                .id(p.getId())
                .penaltyId(p.getPenaltyId())
                .paymentMethod(p.getPaymentMethod())
                .transactionId(p.getTransactionId())
                .createdAt(p.getCreatedAt())
                .build());
    }

    // Get all penalty payments
    public List<PenaltyPaymentDTO> getAllPenaltyPayments() {
        List<PenaltyPayment> penaltyPayments = penaltyPaymentDAO.getAllPenaltyPayments();
        return penaltyPayments.stream()
                .map(p -> PenaltyPaymentDTO.builder()
                        .id(p.getId())
                        .penaltyId(p.getPenaltyId())
                        .paymentMethod(p.getPaymentMethod())
                        .transactionId(p.getTransactionId())
                        .createdAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // Get penalty payments by penalty ID
    public List<PenaltyPaymentDTO> getPenaltyPaymentsByPenaltyId(Long penaltyId) {
        List<PenaltyPayment> penaltyPayments = penaltyPaymentDAO.getPenaltyPaymentsByPenaltyId(penaltyId);
        return penaltyPayments.stream()
                .map(p -> PenaltyPaymentDTO.builder()
                        .id(p.getId())
                        .penaltyId(p.getPenaltyId())
                        .paymentMethod(p.getPaymentMethod())
                        .transactionId(p.getTransactionId())
                        .createdAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // Delete a penalty payment
    public void deletePenaltyPayment(Long id) {
        penaltyPaymentDAO.deletePenaltyPayment(id);
    }
}
