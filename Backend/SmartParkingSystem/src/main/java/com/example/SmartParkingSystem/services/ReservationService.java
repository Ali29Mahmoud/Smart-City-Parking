package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ReservationDao;
import com.example.SmartParkingSystem.dtos.reservation.ReservationCreateDTO;
import com.example.SmartParkingSystem.dtos.reservation.ReservationDTO;
import com.example.SmartParkingSystem.entities.PricingStructure;
import com.example.SmartParkingSystem.entities.Reservation;
import com.example.SmartParkingSystem.entities.ReservationStatus;
import com.example.SmartParkingSystem.entities.SpotType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationDao reservationDao;

    public ReservationService(ReservationDao reservationDao) {
        this.reservationDao = reservationDao;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void createReservation(ReservationCreateDTO reservationCreateDTO) {
        if (reservationDao.isSpotAvailable(reservationCreateDTO.getSpotId(), reservationCreateDTO.getScheduledCheckIn(),
                reservationCreateDTO.getScheduledCheckOut())) {
            System.out.println("Spot Not Available");
        }
        try {
            Reservation reservation = Reservation.builder()
                    .driverId(reservationCreateDTO.getDriverId())
                    .spotId(reservationCreateDTO.getSpotId())
                    .scheduledCheckIn(reservationCreateDTO.getScheduledCheckIn())
                    .scheduledCheckOut(reservationCreateDTO.getScheduledCheckOut())
                    .amount(new BigDecimal(reservationCreateDTO.getAmount()))
                    .paymentMethod(reservationCreateDTO.getPaymentMethod())
                    .transactionId(reservationCreateDTO.getTransactionId())
                    .status(ReservationStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .build();
            reservationDao.create(reservation);
        } catch (Exception e) {
            System.out.println("Error creating reservation");
        }
    }

    public ReservationDTO updateReservation(ReservationDTO reservationDTO) {
        Reservation reservation = Reservation.builder()
                .id(reservationDTO.getId())
                .driverId(reservationDTO.getDriverId())
                .spotId(reservationDTO.getSpotId())
                .scheduledCheckIn(reservationDTO.getScheduledCheckIn())
                .scheduledCheckOut(reservationDTO.getScheduledCheckOut())
                .amount(new BigDecimal(reservationDTO.getAmount()))
                .paymentMethod(reservationDTO.getPaymentMethod())
                .transactionId(reservationDTO.getTransactionId())
                .status(reservationDTO.getStatus())
                .createdAt(reservationDTO.getCreatedAt())
                .build();
        reservationDao.update(reservation);
        return reservationDTO;
    }

    public ReservationDTO findById(Long id) {
        Optional<Reservation> reservation = reservationDao.findById(id);
        return reservation.map(
                res -> ReservationDTO.builder()
                        .id(res.getId())
                        .driverId(res.getDriverId())
                        .spotId(res.getSpotId())
                        .status(res.getStatus())
                        .checkIn(res.getCheckIn())
                        .checkOut(res.getCheckOut())
                        .scheduledCheckIn(res.getScheduledCheckIn())
                        .scheduledCheckOut(res.getScheduledCheckOut())
                        .amount(res.getAmount().toString())
                        .paymentMethod(res.getPaymentMethod())
                        .transactionId(res.getTransactionId())
                        .createdAt(res.getCreatedAt())
                        .build()
        ).orElse(null);
    }

    public void deleteReservationById(Long id) {
        reservationDao.deleteById(id);
    }

    public List<ReservationDTO> findAllByDriverId(Long driverId) {
        List<Reservation> reservations = reservationDao.findAllByDriverId(driverId);
        return getReservationDTOS(reservations);
    }

    public List<ReservationDTO> findAllBySpotId(Long spotId) {
        List<Reservation> reservations = reservationDao.findAllBySpotId(spotId);
        return getReservationDTOS(reservations);
    }

    public List<ReservationDTO> findAllByStatus(ReservationStatus status) {
        List<Reservation> reservations = reservationDao.findAllByStatus(status);
        return getReservationDTOS(reservations);
    }

    public BigDecimal calculateReservationAmount(ReservationCreateDTO reservationCreateDTO) {
        PricingStructure ps = reservationDao.calculateReservationAmount(reservationCreateDTO.getSpotId());
        MathContext mc = new MathContext(2);
        BigDecimal avSp = BigDecimal.valueOf(ps.getAvailableSpots()).add(BigDecimal.ONE);
        BigDecimal demand = ps.getDemandFactor().divide(avSp, mc);
        BigDecimal ev = ps.getEvFactor();
        BigDecimal bsPrice = ps.getBasePrice();
        if (ps.getSpotType() != SpotType.ELECTRIC) {
            ev = BigDecimal.ZERO;
        }
        BigDecimal duration = BigDecimal.valueOf(reservationCreateDTO.getScheduledCheckOut().getHour() -
                reservationCreateDTO.getScheduledCheckIn().getHour());

        return bsPrice.add(ev).multiply(duration).multiply(demand);
    }


    private List<ReservationDTO> getReservationDTOS(List<Reservation> reservations) {
        return reservations.stream()
                .map(reservation -> ReservationDTO.builder()
                        .id(reservation.getId())
                        .driverId(reservation.getDriverId())
                        .spotId(reservation.getSpotId())
                        .status(reservation.getStatus())
                        .checkIn(reservation.getCheckIn())
                        .checkOut(reservation.getCheckOut())
                        .scheduledCheckIn(reservation.getScheduledCheckIn())
                        .scheduledCheckOut(reservation.getScheduledCheckOut())
                        .amount(reservation.getAmount().toString())
                        .paymentMethod(reservation.getPaymentMethod())
                        .transactionId(reservation.getTransactionId())
                        .createdAt(reservation.getCreatedAt())
                        .build())
                .toList();
    }
}
