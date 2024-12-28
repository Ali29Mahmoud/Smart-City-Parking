package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.ParkingLot;
import com.example.SmartParkingSystem.models.entities.Statistic;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
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


    public Statistic getLotStatistics(Long parkingLotId) {

        // treat as one transaction


        String parkingSpotStatsQuery = """
        SELECT
            SUM(CASE WHEN status = 'FREE' THEN 1 ELSE 0 END) AS freeCount,
            SUM(CASE WHEN status = 'OCCUPIED' THEN 1 ELSE 0 END) AS occupiedCount,
            SUM(CASE WHEN status = 'RESERVED' THEN 1 ELSE 0 END) AS reservedCount
        FROM ParkingSpot
        WHERE parkingLotId = ?
        """;

        Map<String, Object> parkingSpotStats = jdbcTemplate.queryForMap(parkingSpotStatsQuery, parkingLotId);

        Integer free = ((Number) parkingSpotStats.get("freeCount")).intValue();
        Integer occupied = ((Number) parkingSpotStats.get("occupiedCount")).intValue();
        Integer reserved = ((Number) parkingSpotStats.get("reservedCount")).intValue();

        String reservationStatsQuery = """
        SELECT
            COUNT(*) AS totalReservations,
            SUM(CASE WHEN r.status = 'ACTIVE' THEN 1 ELSE 0 END) AS activeReservations,
            SUM(CASE WHEN r.status = 'PENDING' THEN 1 ELSE 0 END) AS pendingReservations,
            SUM(CASE WHEN r.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completedReservations,
            SUM(CASE WHEN r.status = 'NO_SHOW' THEN 1 ELSE 0 END) AS noShowReservations
        
        FROM Reservation r JOIN ParkingSpot ps ON r.spotId = ps.id
        WHERE ps.parkingLotId = ? 
        """;

        Map<String, Object> reservationStats = jdbcTemplate.queryForMap(reservationStatsQuery, parkingLotId);

        Integer totalReservations = ((Number) reservationStats.get("totalReservations")).intValue();
        Integer activeReservations = ((Number) reservationStats.get("activeReservations")).intValue();
        Integer pendingReservations = ((Number) reservationStats.get("pendingReservations")).intValue();
        Integer completedReservations = ((Number) reservationStats.get("completedReservations")).intValue();
        Integer noShowReservations = ((Number) reservationStats.get("noShowReservations")).intValue();


            String revenueStatsQuery = """
        
        SELECT SUM(r.amount) AS totalRevenue
        FROM Reservation r JOIN ParkingSpot ps ON r.spotId = ps.id
        WHERE ps.parkingLotId = ?
        """;

        Map<String, Object> revenueStats = jdbcTemplate.queryForMap(revenueStatsQuery, parkingLotId);
        Double totalRevenue = ((Number) revenueStats.get("totalRevenue")).doubleValue();

        System.out.println("Total Revenue: "+totalRevenue);


        String penaltyStatsQuery = """
        SELECT
            SUM(CASE WHEN p.amount > 0 THEN 1 ELSE 0 END) AS withPenaltyCount,
            SUM(p.amount) AS totalPenalty
        FROM Reservation r JOIN Penalty p JOIN ParkingSpot ps ON r.spotId = ps.id
        
        WHERE ps.parkingLotId = ?
        """;

        Map<String, Object> penaltyStats = jdbcTemplate.queryForMap(penaltyStatsQuery, parkingLotId);

        Integer withPenaltyCount = ((Number) penaltyStats.get("withPenaltyCount")).intValue();
        Double totalPenalty = ((Number) penaltyStats.get("totalPenalty")).doubleValue();

        // Construct and return the Statistic object
        return new Statistic(
                free, occupied, reserved,
                totalReservations, activeReservations, pendingReservations, completedReservations, noShowReservations,
                null, withPenaltyCount, totalRevenue, totalPenalty
        );
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
