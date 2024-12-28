package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.PenaltyDAO;
import com.example.SmartParkingSystem.dtos.Penalty.PenaltyDTO;
import com.example.SmartParkingSystem.entities.Penalty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PenaltyService {

    private final PenaltyDAO penaltyDAO;


    public PenaltyService(PenaltyDAO penaltyDAO) {
        this.penaltyDAO = penaltyDAO;
    }

    public void createPenalty(PenaltyDTO penDTO) {
        Penalty pen = Penalty.builder()
                .id(penDTO.getId())
                .createdAt(penDTO.getCreatedAt())
                .reservationId(penDTO.getReservationId())
                .amount(penDTO.getAmount())
                .reason(penDTO.getReason())
                .status(penDTO.getStatus())
                .build();

        penaltyDAO.createPenalty(pen);
    }



    public Optional<PenaltyDTO> getPenaltyById(Long id) {
        Optional<Penalty> penalty = penaltyDAO.getPenaltyById(id);
        return penalty.map(p -> PenaltyDTO.builder()
                .id(p.getId())
                .reservationId(p.getReservationId())
                .amount(p.getAmount())
                .reason(p.getReason())
                .status(p.getStatus())
                .createdAt(p.getCreatedAt())
                .build());
    }

    // Get all penalties
    public List<PenaltyDTO> getAllPenalties() {
        List<Penalty> penalties = penaltyDAO.getAllPenalties();
        Collectors Collectors = null;
        return penalties.stream()
                .map(p -> PenaltyDTO.builder()
                        .id(p.getId())
                        .reservationId(p.getReservationId())
                        .amount(p.getAmount())
                        .reason(p.getReason())
                        .status(p.getStatus())
                        .createdAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public void updatePenaltyStatus(Long id, String status) {
        penaltyDAO.updatePenaltyStatus(id, status);
    }

    public void deletePenalty(Long id) {
        penaltyDAO.deletePenalty(id);
    }

    public List<PenaltyDTO> getPenaltiesByReservationId(Long reservationId) {
        List<Penalty> penalties = penaltyDAO.getPenaltiesByReservationId(reservationId);
        return penalties.stream()
                .map(p -> PenaltyDTO.builder()
                        .id(p.getId())
                        .reservationId(p.getReservationId())
                        .amount(p.getAmount())
                        .reason(p.getReason())
                        .status(p.getStatus())
                        .createdAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }



}
