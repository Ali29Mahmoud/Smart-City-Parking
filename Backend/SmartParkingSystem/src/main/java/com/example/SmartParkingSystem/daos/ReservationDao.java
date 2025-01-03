package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.*;
import com.example.SmartParkingSystem.models.entities.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

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
                AND NOT (? < scheduledCheckIn OR scheduledCheckOut < ?)
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

    public List<ReservationView> findAllByDriverId(Long driverId) {
        String sql = """
                SELECT ParkingLot.location, ParkingLot.name, ParkingSpot.spotNumber, Reservation.status, Reservation.checkIn,
                    Reservation.checkOut, Reservation.scheduledCheckIn, Reservation.scheduledCheckOut, Reservation.amount,
                    Reservation.paymentMethod, Reservation.transactionId, Reservation.createdAt
                FROM
                    Reservation JOIN ParkingSystem.ParkingSpot
                    ON Reservation.spotId = ParkingSpot.id
                    JOIN ParkingSystem.ParkingLot
                    ON ParkingSpot.parkingLotId = ParkingLot.id
                WHERE userID = ?
                ORDER BY scheduledCheckIn DESC
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> ReservationView.builder()
                .location(rs.getString("location"))
                .name(rs.getString("name"))
                .spotNumber(rs.getInt("spotNumber"))
                .status(ReservationStatus.valueOf(rs.getString("status")))
                .scheduledCheckIn(rs.getTimestamp("scheduledCheckIn").toLocalDateTime())
                .scheduledCheckOut(rs.getTimestamp("scheduledCheckOut").toLocalDateTime())
                .amount(rs.getBigDecimal("amount"))
                .paymentMethod(rs.getString("paymentMethod"))
                .transactionId(rs.getString("transactionId"))
                .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                .build(), driverId);
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

    public Integer getTimeLimitBySpotId(Integer spotId) {
        String sql = """
                SELECT timeLimit
                FROM ParkingSpot JOIN ParkingLot ON ParkingSpot.parkingLotId = ParkingLot.id
                WHERE ParkingSpot.id = ?
                """;
        return jdbcTemplate.queryForObject(sql, Integer.class, spotId);
    }


    public List<User> getTop10Drivers(){

        String sql = """
               
                SELECT u.id,u.name,COUNT(*) as count
                    FROM Reservation r JOIN
                    Users u
                    GROUP BY u.id
                    ORDER BY count DESC
                     LIMIT 10;
                """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            return user;
        });
        }

        public List<ParkingLot> getTop10ParkingLots(){

        String sql = """
               
                SELECT p.id,p.name,COUNT(*) as count
                    FROM Reservation r JOIN
                    ParkingLot p
                    GROUP BY p.id
                    ORDER BY count DESC
                     LIMIT 10;
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            ParkingLot parkingLot = new ParkingLot();
            parkingLot.setId((long) rs.getInt("id"));
            parkingLot.setName(rs.getString("name"));
            return parkingLot;
        });
    }

    public List<ParkingLot> getTop10Revenues(){

            String sql = """
                
                    SELECT p.id,p.name,SUM(r.amount) as revenue
                        FROM Reservation r JOIN
                        ParkingLot p
                        GROUP BY p.id
                        ORDER BY revenue DESC
                        LIMIT 10;
                    """;

            return jdbcTemplate.query(sql, (rs, rowNum) -> {
                ParkingLot parkingLot = new ParkingLot();
                parkingLot.setId((long) rs.getInt("id"));
                parkingLot.setName(rs.getString("name"));
                return parkingLot;
            });
    }

    public List<Reservation> findUpcomingReservationsBySpotId(Long spotId, LocalDateTime now) {
        String sql = """
                SELECT * FROM Reservation WHERE spotId = ? AND scheduledCheckOut > ? ORDER BY scheduledCheckIn
                """;
        return jdbcTemplate.query(sql, new ReservationRowMapper(), spotId, now);

    }

    private static class ReservationRowMapper implements RowMapper<Reservation> {
        @Override
        public Reservation mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Reservation.builder()
                    .id(rs.getLong("id"))
                    .driverId(rs.getInt("userID"))
                    .spotId(rs.getInt("spotId"))
                    .status(ReservationStatus.valueOf(rs.getString("status")))
                    .checkIn(getLocalDateTimeOrNull(rs, "checkIn"))
                    .checkOut(getLocalDateTimeOrNull(rs, "checkOut"))
                    .scheduledCheckIn(getLocalDateTimeOrNull(rs, "scheduledCheckIn"))
                    .scheduledCheckOut(getLocalDateTimeOrNull(rs, "scheduledCheckOut"))
                    .amount(rs.getBigDecimal("amount"))
                    .paymentMethod(rs.getString("paymentMethod"))
                    .transactionId(rs.getString("transactionId"))
                    .createdAt(getLocalDateTimeOrNull(rs, "createdAt"))
                    .build();
        }

        private LocalDateTime getLocalDateTimeOrNull(ResultSet rs, String columnName) throws SQLException {
            java.sql.Timestamp timestamp = rs.getTimestamp(columnName);
            return timestamp != null ? timestamp.toLocalDateTime() : null;
        }
    }

}
