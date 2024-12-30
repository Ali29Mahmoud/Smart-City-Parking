package com.example.SmartParkingSystem.daos;

import com.example.SmartParkingSystem.entities.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProfileDao {
    private final JdbcTemplate jdbcTemplate;

    public ProfileDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Profile findById(Long id) {
        String sql = """
                SELECT * FROM Users WHERE id = ?
                """;
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Profile profile = new Profile();
            profile.setEmail(rs.getString("email"));
            profile.setName(rs.getString("name"));
            profile.setPhoneNumber(rs.getString("phoneNumber"));
            profile.setLicensePlate(rs.getString("licensePlate"));
            profile.setRole(rs.getString("role"));
            profile.setCreatedAt(rs.getString("createdAt"));
            return profile;
        });
    }
}
