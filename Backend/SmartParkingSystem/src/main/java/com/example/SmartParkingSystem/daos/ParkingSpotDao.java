package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.ParkingSpot;
import com.example.SmartParkingSystem.entities.SpotSize;
import com.example.SmartParkingSystem.entities.SpotType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class ParkingSpotDao {
    private final JdbcTemplate jdbcTemplate;

    public ParkingSpotDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void create(ParkingSpot parkingSpot) {
        String sql =
                "INSERT INTO ParkingSpot (parkingLotId, spotNumber, size, type, handicapped, occupied)"
                        + "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                parkingSpot.getParkingLotId(),
                parkingSpot.getSpotNumber(),
                parkingSpot.getSize().toString(),
                parkingSpot.getType().toString(),
                parkingSpot.getHandicapped(),
                parkingSpot.getOccupied());
    }

    public Optional<ParkingSpot> findById(Long id) {
        String sql = "SELECT * FROM ParkingSpot WHERE id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new ParkingSpotRowMapper(), id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<ParkingSpot> findAll(Long parkingLotId) {
        String sql = "SELECT * FROM ParkingSpot WHERE parkingLotId = ? ORDER BY spotNumber";
        return jdbcTemplate.query(sql, new ParkingSpotRowMapper(), parkingLotId);
    }

    public void update(ParkingSpot parkingSpot) {
        String sql = "UPDATE ParkingSpot SET parkingLotId = ?, spotNumber = ?, size = ?, type = ?, handicapped = ?, " +
                "occupied = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                parkingSpot.getParkingLotId(),
                parkingSpot.getSpotNumber(),
                parkingSpot.getSize().toString(),
                parkingSpot.getType().toString(),
                parkingSpot.getHandicapped(),
                parkingSpot.getOccupied(),
                parkingSpot.getId());
    }

    public void deleteById(Long id) {
        String sql = "DELETE FROM ParkingSpot WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void createMultiple(Long parkingLotId, int spotNumberStart, int spotNumberEnd, String size, String type,
                               boolean handicapped) {
        String sql = "CALL CreateMultipleParkingSpots(?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, parkingLotId, spotNumberStart, spotNumberEnd, size, type, handicapped);
    }


    private static class ParkingSpotRowMapper implements RowMapper<ParkingSpot> {
        @Override
        public ParkingSpot mapRow(ResultSet rs, int rowNum) throws SQLException {
            return ParkingSpot.builder()
                    .id(rs.getLong("id"))
                    .parkingLotId(rs.getLong("parkingLotId"))
                    .spotNumber(rs.getInt("spotNumber"))
                    .size(SpotSize.valueOf(rs.getString("size")))
                    .type(SpotType.valueOf(rs.getString("type")))
                    .handicapped(rs.getBoolean("handicapped"))
                    .occupied(rs.getBoolean("occupied"))
                    .build();
        }
    }
}
