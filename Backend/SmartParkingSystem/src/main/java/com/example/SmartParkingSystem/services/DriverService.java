package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.Security.JWTService;
import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.Driver;
import com.example.SmartParkingSystem.repositories.DriverRepository;
import com.example.SmartParkingSystem.services.mappers.DriverDTOMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DriverService {
    private DriverRepository driverRepository;
    private DriverDTOMapper driverDTOMapper;
    private JWTService jwtService;
    public DriverService(DriverRepository driverRepository, DriverDTOMapper driverDTOMapper
                                ,JWTService jwtService){
        this.driverRepository = driverRepository;
        this.driverDTOMapper = driverDTOMapper;
        this.jwtService = jwtService;
    }

    public void addDriver(DriverDTO driverDTO){
        Driver driver = driverDTOMapper.apply(driverDTO);
        driverRepository.save(driver);
    }
    public ResponseEntity<String> login(String email){
        Optional<Driver> optionalDriver = driverRepository.findByEmail(email);
        ResponseEntity<String> response;
        if(optionalDriver.isPresent()){
            Driver driver =optionalDriver.get();

            String driverEmail = driver.getEmail();
            response = new ResponseEntity<>(jwtService.generateToken(driverEmail), HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>("Driver is not registered", HttpStatus.UNAUTHORIZED);
        }
        return response;
    }
}