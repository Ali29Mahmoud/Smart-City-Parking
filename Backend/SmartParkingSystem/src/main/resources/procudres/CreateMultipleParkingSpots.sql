DELIMITER //

CREATE PROCEDURE CreateMultipleParkingSpots(
    IN parkingLotId BIGINT,
    IN spotNumberStart INT,
    IN spotNumberEnd INT,
    IN size ENUM('REGULAR', 'LARGE'),
    IN type ENUM('GAS', 'ELECTRIC'),
    IN handicapped BOOLEAN
)
BEGIN
    DECLARE spotNumber INT;
    SET spotNumber = spotNumberStart;
    WHILE spotNumber <= spotNumberEnd DO
            INSERT INTO ParkingSpot (parkingLotId, spotNumber, size, type, handicapped, occupied)
            VALUES (parkingLotId, spotNumber, size, type, handicapped, FALSE);
            SET spotNumber = spotNumber + 1;
        END WHILE;
END //

DELIMITER ;