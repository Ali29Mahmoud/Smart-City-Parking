package com.example.SmartParkingSystem.models.entities;

import java.time.LocalDate;

public class Driver {
    private Integer id;
    private String email;
    private String hashedPassword;
    private String phoneNumber;
    private String licencePlate;
    private String name;
    private Boolean hasUnpaidPenalties;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    // Default constructor
    public Driver() {}

    // All-args constructor
    public Driver(Integer id, String email, String hashedPassword,
                  String phoneNumber, String licencePlate, String name,
                  Boolean hasUnpaidPenalties, LocalDate createdAt, LocalDate updatedAt) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.phoneNumber = phoneNumber;
        this.licencePlate = licencePlate;
        this.name = name;
        this.hasUnpaidPenalties = hasUnpaidPenalties;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() { return id; }
    public String getEmail() { return email; }
    public String getHashedPassword() { return hashedPassword; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getLicencePlate() { return licencePlate; }
    public String getName() { return name; }
    public Boolean getHasUnpaidPenalties() { return hasUnpaidPenalties; }
    public LocalDate getCreatedAt() { return createdAt; }
    public LocalDate getUpdatedAt() { return updatedAt; }

    // Setters
    public void setId(Integer id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setLicencePlate(String licencePlate) { this.licencePlate = licencePlate; }
    public void setName(String name) { this.name = name; }
    public void setHasUnpaidPenalties(Boolean hasUnpaidPenalties) { this.hasUnpaidPenalties = hasUnpaidPenalties; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDate updatedAt) { this.updatedAt = updatedAt; }
}