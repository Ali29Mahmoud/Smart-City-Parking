package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.entities.Profile;
import com.example.SmartParkingSystem.services.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile/{id}")
    public Profile getProfile(@PathVariable Long id) {
        return profileService.findById(id);
    }
}
