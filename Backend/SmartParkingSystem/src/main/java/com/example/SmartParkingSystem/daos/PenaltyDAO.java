package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.Penalty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PenaltyDAO {

    private final JdbcTemplate jdbcTemplate;

    public PenaltyDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Penalty> penaltyRowMapper = new RowMapper<Penalty>() {
        @Override
        public Penalty mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Penalty.builder()
                    .id(rs.getLong("id"))
                    .reservationId(rs.getLong("reservationId"))
                    .amount(rs.getBigDecimal("amount"))
                    .reason(rs.getString("reason"))
                    .status(rs.getString("status"))
                    .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                    .build();
        }
    };

    public void createPenalty(Penalty penalty) {
        String sql = "INSERT INTO Penalty (reservationId, amount, reason, status, createdAt) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                penalty.getReservationId(),
                penalty.getAmount(),
                penalty.getReason(),
                penalty.getStatus(),
                penalty.getCreatedAt());
    }

    public Optional<Penalty> getPenaltyById(Long id) {
        String sql = "SELECT * FROM Penalty WHERE id = ?";
        try {
            Penalty penalty = jdbcTemplate.queryForObject(sql, penaltyRowMapper, id);
            return Optional.ofNullable(penalty);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<Penalty> getAllPenalties() {
        String sql = "SELECT * FROM Penalty";
        return jdbcTemplate.query(sql, penaltyRowMapper);
    }

    public void updatePenaltyStatus(Long id, String status) {
        String sql = "UPDATE Penalty SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }

    public void deletePenalty(Long id) {
        String sql = "DELETE FROM Penalty WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<Penalty> getPenaltiesByReservationId(Long reservationId) {
        String sql = "SELECT * FROM Penalty WHERE reservationId = ?";
        return jdbcTemplate.query(sql, penaltyRowMapper, reservationId);
    }
}
