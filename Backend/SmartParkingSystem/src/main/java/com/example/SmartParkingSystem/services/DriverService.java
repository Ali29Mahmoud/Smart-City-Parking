package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.Security.JWTService;
import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.User;
import com.example.SmartParkingSystem.models.enums.Role;
import com.example.SmartParkingSystem.repositories.DriverRepository;
import com.example.SmartParkingSystem.services.mappers.DriverDTOMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DriverService {
    private DriverRepository driverRepository;
    private DriverDTOMapper driverDTOMapper;
    private JWTService jwtService;
    private UserDetailsService userDetailsService;
    public DriverService(DriverRepository driverRepository, DriverDTOMapper driverDTOMapper
                                ,JWTService jwtService, UserDetailsService userDetailsService){
        this.driverRepository = driverRepository;
        this.driverDTOMapper = driverDTOMapper;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    public void addDriver(DriverDTO driverDTO){
        User driver = driverDTOMapper.apply(driverDTO);
        driver.setRole(Role.DRIVER);//Default user
        driverRepository.save(driver);
    }
    public ResponseEntity<String> login(String email){
        Optional<User> optionalDriver = driverRepository.findByEmail(email);
        ResponseEntity<String> response;
        if(optionalDriver.isPresent()){
            User driver =optionalDriver.get();
            String driverEmail = driver.getEmail();
            System.out.println("Email authenticated");
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            response = new ResponseEntity<>(jwtService.generateToken(userDetails), HttpStatus.OK);
        }
        else{
            response = new ResponseEntity<>("Driver is not registered", HttpStatus.UNAUTHORIZED);
        }
        return response;
    }
}
