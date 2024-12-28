package com.example.SmartParkingSystem.models.dtos;

import org.springframework.data.relational.core.sql.In;

public class LoginResponseDTO {
    private String token;
    private Integer userId;

    public LoginResponseDTO(String token, Integer userId) {
        this.token = token;
        this.userId = userId;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }
}
