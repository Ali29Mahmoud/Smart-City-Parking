package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.Reservation;
import com.example.SmartParkingSystem.entities.ReservationStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationDao {
    private final JdbcTemplate jdbcTemplate;

    public ReservationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void create(Reservation reservation) {
        String sql = """
                INSERT INTO Reservation (driverId, spotId, status, checkIn, checkOut, scheduledCheckIn,
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
                UPDATE Reservation SET driverId = ?, spotId = ?, status = ?, checkIn = ?, checkOut = ?,
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
                SELECT * FROM Reservation WHERE driverId = ?
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), driverId);
    }

    public List<Reservation> findAllBySpotId(Long spotId) {
        String sql = """
                SELECT * FROM Reservation WHERE spotId = ?
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), spotId);
    }

    public List<Reservation> findAllByStatus(ReservationStatus status) {
        String sql = """
                SELECT * FROM Reservation WHERE status = ?
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), status.toString());
    }

    private static class ReservationRowMapper implements RowMapper<Reservation> {
        @Override
        public Reservation mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Reservation.builder()
                    .id(rs.getLong("id"))
                    .driverId(rs.getInt("driverId"))
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
