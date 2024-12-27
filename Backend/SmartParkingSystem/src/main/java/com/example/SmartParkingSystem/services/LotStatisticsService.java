package com.example.SmartParkingSystem.services;


import com.example.SmartParkingSystem.daos.ParkingLotDao;
import com.example.SmartParkingSystem.daos.ParkingSpotDao;
import com.example.SmartParkingSystem.daos.ReservationDao;
import com.example.SmartParkingSystem.dtos.parkingSpot.ParkingSpotDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LotStatisticsService {



    private final ParkingLotDao parkingLotDao;

    private final ParkingSpotDao parkingSpotDao;

    private final ReservationDao  reservationDao;

    private final ParkingSpotService parkingSpotService;

    private final ParkingLotService parkingLotService;

    //  get all parking spots in lot




    // Calculate the statistics  of the parking lot
    @Transactional(readOnly = true)
    public void calculateStatistics(Long lotId) {
        // get all parking spots in lot


        // get all reservations in lot
        // calculate the statistics
    }





}
