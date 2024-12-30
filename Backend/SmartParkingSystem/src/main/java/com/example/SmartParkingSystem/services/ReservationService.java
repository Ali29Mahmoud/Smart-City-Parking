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
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {
    private final ReservationDao reservationDao;

    public ReservationService(ReservationDao reservationDao) {
        this.reservationDao = reservationDao;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public boolean createReservation(ReservationCreateDTO reservationCreateDTO) {
        LocalDateTime now = LocalDateTime.now();
        
        // Validate against current time
        if (reservationCreateDTO.getScheduledCheckIn().isBefore(now)) {
            throw new IllegalArgumentException("Check-in time must be in the future");
        }

        // Check spot availability
        if (!reservationDao.isSpotAvailable(
                reservationCreateDTO.getSpotId(),
                reservationCreateDTO.getScheduledCheckIn(),
                reservationCreateDTO.getScheduledCheckOut()
        )) {
            return false;
        }

        // Check time limit
        Integer timeLimit = reservationDao.getTimeLimitBySpotId(reservationCreateDTO.getSpotId());
        Duration duration = Duration.between(reservationCreateDTO.getScheduledCheckIn(), reservationCreateDTO.getScheduledCheckOut());
        int durationInHours = (int) Math.ceil(duration.getSeconds() / 3600.0);
        if (timeLimit != null && durationInHours > timeLimit) {
            throw new IllegalArgumentException("Reservation duration exceeds time limit");
        }

        // Calculate amount
        BigDecimal amount = calculateReservationAmount(reservationCreateDTO);
        
        // Generate transaction ID
        String transactionId = UUID.randomUUID().toString();

        try {
            Reservation reservation = Reservation.builder()
                    .driverId(reservationCreateDTO.getDriverId())
                    .spotId(reservationCreateDTO.getSpotId())
                    .scheduledCheckIn(reservationCreateDTO.getScheduledCheckIn())
                    .scheduledCheckOut(reservationCreateDTO.getScheduledCheckOut())
                    .amount(amount)
                    .paymentMethod(reservationCreateDTO.getPaymentMethod())
                    .transactionId(transactionId)
                    .status(ReservationStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .build();
            reservationDao.create(reservation);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error creating reservation: " + e.getMessage());
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
        LocalDateTime now = LocalDateTime.now();
        
        // Validate against current time
        if (reservationCreateDTO.getScheduledCheckIn().isBefore(now)) {
            throw new IllegalArgumentException("Check-in time must be in the future");
        }

        // Validate time period
        if (reservationCreateDTO.getScheduledCheckOut().isBefore(reservationCreateDTO.getScheduledCheckIn()) ||
            reservationCreateDTO.getScheduledCheckOut().equals(reservationCreateDTO.getScheduledCheckIn())) {
            throw new IllegalArgumentException("Check-out time must be after check-in time");
        }

        PricingStructure ps = reservationDao.calculateReservationAmount(reservationCreateDTO.getSpotId());
        MathContext mc = new MathContext(2);
        BigDecimal avSp = BigDecimal.valueOf(ps.getAvailableSpots()).add(BigDecimal.ONE);
        BigDecimal demand = ps.getDemandFactor().divide(avSp, mc);
        BigDecimal ev = ps.getEvFactor();
        BigDecimal bsPrice = ps.getBasePrice();
        
        if (ps.getSpotType() != SpotType.ELECTRIC) {
            ev = BigDecimal.ZERO;
        }

        // Calculate duration in hours, ensuring positive value
        Duration duration = Duration.between(
            reservationCreateDTO.getScheduledCheckIn(),
            reservationCreateDTO.getScheduledCheckOut()
        );
        if (duration.isNegative() || duration.isZero()) {
            throw new IllegalArgumentException("Invalid time period");
        }
        
        BigDecimal durationHours = BigDecimal.valueOf(
            Math.ceil(duration.toSeconds() / 3600.0)
        );

        BigDecimal ans = bsPrice.add(ev).multiply(durationHours).multiply(demand);
        return ans.setScale(2, RoundingMode.HALF_UP);
    }

    public List<ReservationDTO> getUpcomingReservations(Long spotId) {
        LocalDateTime now = LocalDateTime.now();
        List<Reservation> reservations = reservationDao.findUpcomingReservationsBySpotId(spotId, now);
        return reservations.stream().map(reservation -> ReservationDTO.builder()
                .scheduledCheckIn(reservation.getScheduledCheckIn())
                .scheduledCheckOut(reservation.getScheduledCheckOut())
                .build())
                .toList();
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
