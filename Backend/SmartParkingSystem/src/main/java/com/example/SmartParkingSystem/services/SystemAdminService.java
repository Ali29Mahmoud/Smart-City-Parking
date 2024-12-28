package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.User;
import com.example.SmartParkingSystem.models.enums.Role;
import com.example.SmartParkingSystem.repositories.DriverRepository;
import com.example.SmartParkingSystem.services.mappers.DriverDTOMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SystemAdminService {
    private final DriverRepository driverRepository;
    private DriverDTOMapper driverDTOMapper;

    public SystemAdminService(DriverRepository driverRepository, DriverDTOMapper driverDTOMapper){
        this.driverRepository =driverRepository;
        this.driverDTOMapper = driverDTOMapper;
    }
    public void createNewAdmin(DriverDTO driverDTO){
        User parkingManager = driverDTOMapper.apply(driverDTO);
        parkingManager.setRole(Role.PARKING_MANAGER);//Default user
        driverRepository.save(parkingManager);
    }
    public void createNewSystemAdmin(DriverDTO driverDTO){
        User systemAdmin = driverDTOMapper.apply(driverDTO);
        systemAdmin.setRole(Role.SYSTEM_ADMIN);
        driverRepository.save(systemAdmin);
    }
    public void removeAdmin(int adminId){
        driverRepository.deleteById(adminId);
    }
}
