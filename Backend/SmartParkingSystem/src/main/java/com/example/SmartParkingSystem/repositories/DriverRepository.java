package com.example.SmartParkingSystem.repositories;

import com.example.SmartParkingSystem.models.entities.Driver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

@Repository
public class DriverRepository {
    private JdbcTemplate jdbcTemplate;
    private static final String TABLE_NAME = "drivers";
    public DriverRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    private final RowMapper<Driver> rowMapper = (ResultSet rs, int rowNum) -> {
        Driver driver = new Driver();
        driver.setId(rs.getInt("id"));
        driver.setEmail(rs.getString("email"));
        driver.setHashedPassword(rs.getString("hashed_password"));
        driver.setPhoneNumber(rs.getString("phone_number"));
        driver.setLicencePlate(rs.getString("licence_plate"));
        driver.setName(rs.getString("name"));
        driver.setHasUnpaidPenalties(rs.getBoolean("has_unpaid_penalties"));
        driver.setCreatedAt(rs.getDate("created_at").toLocalDate());
        driver.setUpdatedAt(rs.getDate("updated_at").toLocalDate());
        return driver;
    };
    public Driver save(Driver driver){
        String sql = """
            INSERT INTO drivers (email, hashed_password, phone_number, licence_plate, 
            name, has_unpaid_penalties, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """;
        jdbcTemplate.update(sql,
                driver.getEmail(),
                driver.getHashedPassword(),
                driver.getPhoneNumber(),
                driver.getLicencePlate(),
                driver.getName(),
                driver.getHasUnpaidPenalties(),
                driver.getCreatedAt(),
                driver.getUpdatedAt()
        );
        return driver;
    }
    public Optional<Driver> findById (Integer id) {
        String sql = "SELECT * FROM DRIVER WHERE id = ?";
        try{
            Driver driver = jdbcTemplate.queryForObject(sql, rowMapper, id);
            return Optional.ofNullable(driver);
        }catch(Exception e){
            return Optional.empty();
        }
    }
    public Optional<Driver> findByEmail (String email){
        String sql = "SELECT * FROM DRIVER WHERE email = ?";
        try{
            Driver driver = jdbcTemplate.queryForObject(sql, rowMapper, email);
            return Optional.ofNullable(driver);
        }
        catch (Exception e){
            return Optional.empty();
        }
    }
    public List<Driver> findAll(){
        String sql = "SELECT * FROM Driver";
        return jdbcTemplate.query(sql, rowMapper);
    }
    public void update(Driver driver) {
        String sql = """
            UPDATE drivers 
            SET email = ?, hashed_password = ?, phone_number = ?, 
            licence_plate = ?, name = ?, has_unpaid_penalties = ?, updated_at = ?
            WHERE id = ?
            """;

        jdbcTemplate.update(sql,
                driver.getEmail(),
                driver.getHashedPassword(),
                driver.getPhoneNumber(),
                driver.getLicencePlate(),
                driver.getName(),
                driver.getHasUnpaidPenalties(),
                driver.getUpdatedAt(),
                driver.getId()
        );
    }
    public void deleteById(Integer id) {
        String sql = "DELETE FROM drivers WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

}
