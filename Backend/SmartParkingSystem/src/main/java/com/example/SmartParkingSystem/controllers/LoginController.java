package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.models.dtos.RegistrationDTO;
import com.example.SmartParkingSystem.models.dtos.TokenDTO;
import com.example.SmartParkingSystem.services.DriverService;
import com.example.SmartParkingSystem.services.GmailValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {
    private DriverService driverService;
    private GmailValidationService gmailValidationService;
    public LoginController(DriverService driverService, GmailValidationService gmailValidationService){
        this.driverService = driverService;
        this.gmailValidationService = gmailValidationService;
    }
    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody RegistrationDTO registrationDTO){
        String gmail = registrationDTO.email();
        return driverService.login(gmail);
    }
}
