package com.example.SmartParkingSystem.controllers;

import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.repositories.DriverRepository;
import com.example.SmartParkingSystem.services.SystemAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Driver;

@RestController
@RequestMapping("/api/super")
@CrossOrigin(origins = "http://localhost:5173")
public class SystemAdminController {
    private final SystemAdminService systemAdminService;
    public SystemAdminController(SystemAdminService systemAdminService){
        this.systemAdminService = systemAdminService;
    }
    @PostMapping("")
    public ResponseEntity<DriverDTO> createSystemAdmin(@RequestBody DriverDTO driverDTO){
        systemAdminService.createNewAdmin(driverDTO);
        return ResponseEntity.ok(driverDTO);
    }
    @PostMapping("/admin")
    public ResponseEntity<DriverDTO> createAdmin(@RequestBody DriverDTO driverDTO){
        System.out.println("request received"+driverDTO.email());
         systemAdminService.createNewAdmin(driverDTO);
         return ResponseEntity.ok(driverDTO);
    }
    @DeleteMapping("/admin/{admin_id}")
    public ResponseEntity<String> removeAdmin(@PathVariable int adminId){
        systemAdminService.removeAdmin(adminId);
        return ResponseEntity.ok("admin removed successfully");
    }

}
