package com.example.SmartParkingSystem.repositories;

import com.example.SmartParkingSystem.models.entities.User;
import com.example.SmartParkingSystem.models.enums.Role;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

@Repository
public class DriverRepository {
    private JdbcTemplate jdbcTemplate;
    private static final String TABLE_NAME = "users";
    public DriverRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    private final RowMapper<User> rowMapper = (ResultSet rs, int rowNum) -> {
        User driver = new User();
        System.out.println("Checking email: "+rs.getString("email"));
        driver.setId(rs.getInt("id"));
        driver.setEmail(rs.getString("email"));
        driver.setHashedPassword(rs.getString("hashedPassword"));
        driver.setPhoneNumber(rs.getString("phoneNumber"));
        driver.setLicencePlate(rs.getString("licensePlate"));
        driver.setName(rs.getString("name"));
        driver.setHasUnpaidPenalties(rs.getBoolean("unpaidPenalties"));
        driver.setCreatedAt(rs.getDate("createdAt").toLocalDate());
        driver.setUpdatedAt(rs.getDate("updatedAt").toLocalDate());
        driver.setRole(Role.valueOf(rs.getString("role")));
        return driver;
    };
    public User save(User driver){
        String sql = """
            INSERT INTO Users (email, hashedPassword, phoneNumber, licensePlate, 
            name, unpaidPenalties, createdAt, updatedAt, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;
        jdbcTemplate.update(sql,
                driver.getEmail(),
                driver.getHashedPassword(),
                driver.getPhoneNumber(),
                driver.getLicencePlate(),
                driver.getName(),
                driver.getHasUnpaidPenalties(),
                driver.getCreatedAt(),
                driver.getUpdatedAt(),
                driver.getRole().name()
        );
        return driver;
    }
    public Optional<User> findById (Integer id) {
        String sql = "SELECT * FROM Users WHERE id = ?";
        try{
            User driver = jdbcTemplate.queryForObject(sql, rowMapper, id);
            return Optional.ofNullable(driver);
        }catch(Exception e){
            return Optional.empty();
        }
    }
    public Optional<User> findByEmail (String email){
        System.out.println("Finding by email: "+email);
        String sql = "SELECT * FROM Users WHERE email = ?";
        try{
            System.out.println("going to row mapper");
            System.out.println("Sql: "+jdbcTemplate.queryForObject(sql, rowMapper, email));
            User driver = jdbcTemplate.queryForObject(sql, rowMapper, email);
            System.out.println(driver.getCreatedAt());
            return Optional.ofNullable(driver);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
    public List<User> findAll(){
        String sql = "SELECT * FROM Users";
        return jdbcTemplate.query(sql, rowMapper);
    }
    public void update(User driver) {
        String sql = """
            UPDATE Users 
            SET email = ?, hashedPassword = ?, phoneNumber = ?, 
            licensePlate = ?, name = ?, unpaidPenalties = ?, updatedAt = ?
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
        String sql = "DELETE FROM Users WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

}
