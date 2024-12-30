package com.example.SmartParkingSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Profile {
    private String email;
    private String name;
    private String phoneNumber;
    private String licensePlate;
    private String role;
    private String createdAt;
}
