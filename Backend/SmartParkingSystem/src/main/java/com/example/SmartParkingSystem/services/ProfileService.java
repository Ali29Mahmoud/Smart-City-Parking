package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ProfileDao;
import com.example.SmartParkingSystem.entities.Profile;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileDao profileDao;

    public ProfileService(ProfileDao profileDao) {
        this.profileDao = profileDao;
    }

    public Profile findById(Long id) {
        return profileDao.findById(id);
    }
}
