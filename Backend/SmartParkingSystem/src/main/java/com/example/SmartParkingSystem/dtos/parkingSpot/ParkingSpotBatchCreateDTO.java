package com.example.SmartParkingSystem.dtos.parkingSpot;
import com.example.SmartParkingSystem.entities.SpotSize;
import com.example.SmartParkingSystem.entities.SpotType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParkingSpotBatchCreateDTO {
    private Long parkingLotId;
    private Integer spotNumberStart;
    private Integer spotNumberEnd;
    private SpotSize size;
    private SpotType type;
    private Boolean handicapped;
}
