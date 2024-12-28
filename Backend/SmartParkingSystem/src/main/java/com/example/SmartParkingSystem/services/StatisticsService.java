package com.example.SmartParkingSystem.services;

import com.example.SmartParkingSystem.daos.ParkingLotDao;
import com.example.SmartParkingSystem.daos.ReservationDao;
import com.example.SmartParkingSystem.dtos.parkingLot.ParkingLotDTO;
import com.example.SmartParkingSystem.entities.ParkingLot;
import com.example.SmartParkingSystem.models.dtos.DriverDTO;
import com.example.SmartParkingSystem.models.entities.Statistic;
import com.example.SmartParkingSystem.services.mappers.DriverDTOMapper;
import com.example.SmartParkingSystem.services.mappers.ParkingLotMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final ParkingLotDao parkingLotDao;

    private final ReservationDao  reservationDao;

    private final ParkingLotMapper parkingLotMapper;

    private final DriverDTOMapper driverDTOMapper;



    // Calculate the statistics  of the parking lot
    @Transactional(readOnly = true,isolation = Isolation.READ_COMMITTED)
    public Statistic calculateLotStatistics(Long lotId) {
        return parkingLotDao.getLotStatistics(lotId);
    }

    // get top 10 parking lots with the most reservations
    @Transactional(readOnly = true,isolation = Isolation.READ_COMMITTED)
    public List<ParkingLotDTO> getTop10ParkingLotsWithMostReservations() {
        List<ParkingLot>  lots = reservationDao.getTop10ParkingLots();

        return parkingLotMapper.toDTOs(lots);
    }

    // get top 10 parking lots with the most revenue

    @Transactional(readOnly = true)
    public List<ParkingLotDTO> getTop10ParkingLotsWithMostRevenue() {
        List<ParkingLot>  lots = reservationDao.getTop10Revenues();

        return parkingLotMapper.toDTOs(lots);
    }

    // get top 10 reserving users
    @Transactional(readOnly = true)
    public List<DriverDTO> getTop10ReservingUsers() {
        return driverDTOMapper.toDTOs(reservationDao.getTop10Drivers());
    }




}
