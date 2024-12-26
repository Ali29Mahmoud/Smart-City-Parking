package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.models.dtos.TokenDTO;
import com.example.SmartParkingSystem.services.DriverService;
import com.example.SmartParkingSystem.services.GmailValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
    private DriverService driverService;
    private GmailValidationService gmailValidationService;
    public LoginController(DriverService driverService, GmailValidationService gmailValidationService){
        this.driverService = driverService;
        this.gmailValidationService = gmailValidationService;
    }
    @PostMapping("")
    public ResponseEntity<String> login(@RequestBody TokenDTO tokenDTO){
        String gmail = gmailValidationService.fetchGoogleEmail(tokenDTO.token());
        return driverService.login(gmail);
    }
}
