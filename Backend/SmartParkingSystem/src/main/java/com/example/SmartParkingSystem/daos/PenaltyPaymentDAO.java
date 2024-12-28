package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.PenaltyPayment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PenaltyPaymentDAO {

    private final JdbcTemplate jdbcTemplate;

    public PenaltyPaymentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<PenaltyPayment> penaltyPaymentRowMapper = new RowMapper<PenaltyPayment>() {
        @Override
        public PenaltyPayment mapRow(ResultSet rs, int rowNum) throws SQLException {
            return PenaltyPayment.builder()
                    .id(rs.getLong("id"))
                    .penaltyId(rs.getLong("penaltyId"))
                    .paymentMethod(rs.getString("paymentMethod"))
                    .transactionId(rs.getString("transactionId"))
                    .createdAt(rs.getTimestamp("createdAt").toLocalDateTime())
                    .build();
        }
    };

    public void createPenaltyPayment(PenaltyPayment penaltyPayment) {
        String sql = "INSERT INTO PenaltyPayment (penaltyId, paymentMethod, transactionId, createdAt) " +
                "VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                penaltyPayment.getPenaltyId(),
                penaltyPayment.getPaymentMethod(),
                penaltyPayment.getTransactionId(),
                penaltyPayment.getCreatedAt());
    }

    public Optional<PenaltyPayment> getPenaltyPaymentById(Long id) {
        String sql = "SELECT * FROM PenaltyPayment WHERE id = ?";
        try {
            PenaltyPayment penaltyPayment = jdbcTemplate.queryForObject(sql, penaltyPaymentRowMapper, id);
            return Optional.ofNullable(penaltyPayment);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<PenaltyPayment> getAllPenaltyPayments() {
        String sql = "SELECT * FROM PenaltyPayment";
        return jdbcTemplate.query(sql, penaltyPaymentRowMapper);
    }

    public List<PenaltyPayment> getPenaltyPaymentsByPenaltyId(Long penaltyId) {
        String sql = "SELECT * FROM PenaltyPayment WHERE penaltyId = ?";
        return jdbcTemplate.query(sql, penaltyPaymentRowMapper, penaltyId);
    }

    public void deletePenaltyPayment(Long id) {
        String sql = "DELETE FROM PenaltyPayment WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
