package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.services.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private DriverService driverService;
    public RegisterController(DriverService driverService){
        this.driverService = driverService;
    }

    @PostMapping("")
    public ResponseEntity<DriverDTO> registerDriver(@RequestBody DriverDTO driverDTO){
        driverService.addDriver(driverDTO);
        return ResponseEntity.ok(driverDTO);
    }

}
