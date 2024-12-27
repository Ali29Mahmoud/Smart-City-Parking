package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.ParkingLot;
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
                INSERT INTO ParkingLot (location, name, capacity, availableSpots, basePrice, reservationFactor,
                    availableSpotsFactor, active, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql,
                parkingLot.getLocation(),
                parkingLot.getName(),
                parkingLot.getCapacity(),
                parkingLot.getAvailableSpots(),
                parkingLot.getBasePrice(),
                parkingLot.getReservationFactor(),
                parkingLot.getAvailableSpotsFactor(),
                parkingLot.isActive(),
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
                reservationFactor = ?, availableSpotsFactor = ?, active = ?, updatedAt = ? WHERE id = ?
                """;
        jdbcTemplate.update(sql,
                parkingLot.getLocation(),
                parkingLot.getName(),
                parkingLot.getCapacity(),
                parkingLot.getAvailableSpots(),
                parkingLot.getBasePrice(),
                parkingLot.getReservationFactor(),
                parkingLot.getAvailableSpotsFactor(),
                parkingLot.isActive(),
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
                    .reservationFactor(rs.getBigDecimal("reservationFactor"))
                    .availableSpotsFactor(rs.getBigDecimal("availableSpotsFactor"))
                    .active(rs.getBoolean("active"))
                    .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                    .updatedAt(rs.getTimestamp("updatedAt").toLocalDateTime())
                    .build();
        }
    }
}
