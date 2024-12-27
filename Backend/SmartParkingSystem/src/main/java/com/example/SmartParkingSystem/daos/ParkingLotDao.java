package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.ParkingLot;
import com.example.SmartParkingSystem.models.entities.Statistic;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class ParkingLotDao {
    private final JdbcTemplate jdbcTemplate;

    public ParkingLotDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void create(ParkingLot parkingLot) {
        String sql = """
                INSERT INTO ParkingLot (location, name, capacity, availableSpots, basePrice, demandFactor,
                    evFactor, timeLimit, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql,
                parkingLot.getLocation(),
                parkingLot.getName(),
                parkingLot.getCapacity(),
                parkingLot.getAvailableSpots(),
                parkingLot.getBasePrice(),
                parkingLot.getDemandFactor(),
                parkingLot.getEvFactor(),
                parkingLot.getTimeLimit(),
                parkingLot.getCreatedAt(),
                parkingLot.getUpdatedAt());
    }

    public Optional<ParkingLot> findById(Long id) {
        String sql = """
                SELECT * FROM ParkingLot WHERE id = ?
                """;
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new ParkingLotRowMapper(), id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void update(ParkingLot parkingLot) {
        String sql = """
                UPDATE ParkingLot SET location = ?, name = ?, capacity = ?, availableSpots = ?, basePrice = ?,
                demandFactor = ?, evFactor = ?, timeLimit = ?, updatedAt = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql,
                parkingLot.getLocation(),
                parkingLot.getName(),
                parkingLot.getCapacity(),
                parkingLot.getAvailableSpots(),
                parkingLot.getBasePrice(),
                parkingLot.getDemandFactor(),
                parkingLot.getEvFactor(),
                parkingLot.getTimeLimit(),
                parkingLot.getUpdatedAt(),
                parkingLot.getId());
    }

    public void deleteById(Long id) {
        String sql = """
                DELETE FROM ParkingLot WHERE id = ?
                """;
        jdbcTemplate.update(sql, id);
    }

    public List<ParkingLot> findAll() {
        String sql = """
                SELECT * FROM ParkingLot
                """;
        return jdbcTemplate.query(sql, new ParkingLotRowMapper());
    }

    public Statistic getLotStatistics (Long parkingLotId) {

        // create a transaction to get the statistics of the parking lot


        String q1 = """
               SELECT count(*) FROM ParkingSpot WHERE parkingLotId = ? AND status = 'FREE'
                """;
        Integer free = jdbcTemplate.queryForObject(q1, Integer.class, parkingLotId);

        String q2 = """
               SELECT count(*) FROM ParkingSpot WHERE parkingLotId = ? AND status = 'OCCUPIED'
                """;
        Integer occupied = jdbcTemplate.queryForObject(q2, Integer.class, parkingLotId);

        String q3 = """
               SELECT count(*) FROM ParkingSpot WHERE parkingLotId = ? AND status = 'RESERVED'
                """;

        Integer reserved = jdbcTemplate.queryForObject(q3, Integer.class, parkingLotId);

        String q4 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ?
                """;

        Integer totalReservations = jdbcTemplate.queryForObject(q4, Integer.class, parkingLotId);

        String q5 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND status = 'ACTIVE'
                """;

        Integer activeReservations = jdbcTemplate.queryForObject(q5, Integer.class, parkingLotId);



        String q6 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND status = 'PENDING'
                """;

        Integer pendingReservations = jdbcTemplate.queryForObject(q6, Integer.class, parkingLotId);

        String q7 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND status = 'COMPLETED'
                """;

        Integer completedReservations = jdbcTemplate.queryForObject(q7, Integer.class, parkingLotId);

        String q8 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND status = 'NO_SHOW'
                """;

        Integer noShowReservations = jdbcTemplate.queryForObject(q8, Integer.class, parkingLotId);


        // get penalty statistics

        String q9 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND penalty = 0
                """;

        Integer noPenalty = jdbcTemplate.queryForObject(q9, Integer.class, parkingLotId);

        String q10 = """
               SELECT count(*) FROM Reservation WHERE parkingLotId = ? AND penalty > 0
                """;

        Integer withPenalty = jdbcTemplate.queryForObject(q10, Integer.class, parkingLotId);

        // get the total revenue

        String q11 = """
               SELECT sum(totalPrice) FROM Reservation WHERE parkingLotId = ?
                """;

        Double totalRevenue = jdbcTemplate.queryForObject(q11, Double.class, parkingLotId);

        // get the total revenue

        String q12 = """
               SELECT sum(penalty) FROM Reservation WHERE parkingLotId = ?
                """;

        Double totalPenalty = jdbcTemplate.queryForObject(q12, Double.class, parkingLotId);


        return new Statistic();

    }

    private static class ParkingLotRowMapper implements RowMapper<ParkingLot> {
        @Override
        public ParkingLot mapRow(ResultSet rs, int rowNum) throws SQLException {
            return ParkingLot.builder()
                    .id(rs.getLong("id"))
                    .location(rs.getString("location"))
                    .name(rs.getString("name"))
                    .capacity(rs.getInt("capacity"))
                    .availableSpots(rs.getInt("availableSpots"))
                    .basePrice(rs.getBigDecimal("basePrice"))
                    .demandFactor(rs.getBigDecimal("demandFactor"))
                    .evFactor(rs.getBigDecimal("evFactor"))
                    .timeLimit(rs.getInt("timeLimit"))
                    .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                    .updatedAt(rs.getTimestamp("updatedAt").toLocalDateTime())
                    .build();
        }
    }
}
