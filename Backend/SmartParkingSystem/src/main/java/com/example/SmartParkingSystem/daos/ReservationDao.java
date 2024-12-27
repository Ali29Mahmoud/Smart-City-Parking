package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.PricingStructure;
import com.example.SmartParkingSystem.entities.Reservation;
import com.example.SmartParkingSystem.entities.ReservationStatus;
import com.example.SmartParkingSystem.entities.SpotType;
import org.springframework.data.relational.core.sql.In;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationDao {
    private final JdbcTemplate jdbcTemplate;

    public ReservationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Boolean isSpotAvailable(Integer spotId, LocalDateTime start, LocalDateTime end) {
        String sql = """
                SELECT COUNT(*) FROM Reservation
                WHERE spotId = ?
                AND NOT (? < scheduledCheckIn AND scheduledCheckOut < ?)
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, spotId, end, start);
        return count != null && count == 0;
    }

    public void create(Reservation reservation) {
        String sql = """
                INSERT INTO Reservation (userID, spotId, status, checkIn, checkOut, scheduledCheckIn,
                    scheduledCheckOut, amount, paymentMethod, transactionId, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql,
                reservation.getDriverId(),
                reservation.getSpotId(),
                reservation.getStatus().toString(),
                reservation.getCheckIn(),
                reservation.getCheckOut(),
                reservation.getScheduledCheckIn(),
                reservation.getScheduledCheckOut(),
                reservation.getAmount(),
                reservation.getPaymentMethod(),
                reservation.getTransactionId(),
                reservation.getCreatedAt());
    }

    public Optional<Reservation> findById(Long id) {
        String sql = """
                SELECT * FROM Reservation WHERE id = ?
                """;
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new ReservationRowMapper(), id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void update(Reservation reservation) {
        String sql = """
                UPDATE Reservation SET userID = ?, spotId = ?, status = ?, checkIn = ?, checkOut = ?,
                    scheduledCheckIn = ?, scheduledCheckOut = ?, amount = ?, paymentMethod = ?, transactionId = ?,
                    createdAt = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql,
                reservation.getDriverId(),
                reservation.getSpotId(),
                reservation.getStatus().toString(),
                reservation.getCheckIn(),
                reservation.getCheckOut(),
                reservation.getScheduledCheckIn(),
                reservation.getScheduledCheckOut(),
                reservation.getAmount(),
                reservation.getPaymentMethod(),
                reservation.getTransactionId(),
                reservation.getCreatedAt(),
                reservation.getId());
    }

    public void deleteById(Long id) {
        String sql = """
                DELETE FROM Reservation WHERE id = ?
                """;
        jdbcTemplate.update(sql, id);
    }

    public List<Reservation> findAllByDriverId(Long driverId) {
        String sql = """
                SELECT * FROM Reservation WHERE userID = ? ORDER BY createdAt DESC
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), driverId);
    }

    public List<Reservation> findAllBySpotId(Long spotId) {
        String sql = """
                SELECT * FROM Reservation WHERE spotId = ? ORDER BY scheduledCheckin
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), spotId);
    }

    public List<Reservation> findAllByStatus(ReservationStatus status) {
        String sql = """
                SELECT * FROM Reservation WHERE status = ?
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), status.toString());
    }

    public PricingStructure calculateReservationAmount(Integer spotId) {
        String sql = """
                SELECT basePrice, demandFactor, evFactor, availableSpots, type
                FROM ParkingSpot JOIN ParkingLot ON ParkingSpot.parkingLotId = ParkingLot.id
                WHERE ParkingSpot.id = ?
                """;
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new PricingStructure(
                rs.getBigDecimal("basePrice"),
                rs.getBigDecimal("demandFactor"),
                rs.getBigDecimal("evFactor"),
                rs.getInt("availableSpots"),
                SpotType.valueOf(rs.getString("type"))
        ), spotId);
    }


    private static class ReservationRowMapper implements RowMapper<Reservation> {
        @Override
        public Reservation mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Reservation.builder()
                    .id(rs.getLong("id"))
                    .driverId(rs.getInt("userID"))
                    .spotId(rs.getInt("spotId"))
                    .status(ReservationStatus.valueOf(rs.getString("status")))
                    .checkIn(rs.getTimestamp("checkIn").toLocalDateTime())
                    .checkOut(rs.getTimestamp("checkOut").toLocalDateTime())
                    .scheduledCheckIn(rs.getTimestamp("scheduledCheckIn").toLocalDateTime())
                    .scheduledCheckOut(rs.getTimestamp("scheduledCheckOut").toLocalDateTime())
                    .amount(rs.getBigDecimal("amount"))
                    .paymentMethod(rs.getString("paymentMethod"))
                    .transactionId(rs.getString("transactionId"))
                    .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                    .build();
        }

    }
}
