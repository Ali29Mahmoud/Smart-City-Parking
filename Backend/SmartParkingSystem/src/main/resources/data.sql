INSERT INTO ParkingLot (location, name, capacity, availableSpots, basePrice,
                        reservationFactor, availableSpotsFactor, active,
                        createdAt, updatedAt)
VALUES ('Alexandria', 'Alexandria Parking', 100, 100, 10.0, 0.5, 0.5, true,
        now(), now());
INSERT INTO ParkingLot (location, name, capacity, availableSpots, basePrice,
                        reservationFactor, availableSpotsFactor, active,
                        createdAt, updatedAt)
VALUES ('Cairo', 'Cairo Parking', 200, 200, 20.0, 0.5, 0.5, true,
        now(), now());
INSERT INTO ParkingLot (location, name, capacity, availableSpots, basePrice,
                        reservationFactor, availableSpotsFactor, active,
                        createdAt, updatedAt)
VALUES ('Giza', 'Giza Parking', 300, 300, 30.0, 0.5, 0.5, true,
        now(), now());

INSERT INTO Driver (name, email, phone, password) VALUES ('John Doe', ' jonDoe@example.com', '1234567890', 'password');   
