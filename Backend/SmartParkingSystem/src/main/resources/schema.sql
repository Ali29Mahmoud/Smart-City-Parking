create table Driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driverId INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    type ENUM('reminder', 'payment', 'alert') NOT NULL,
    status ENUM('sent', 'read') NOT NULL,
    priority ENUM('low', 'medium', 'high') NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Driver FOREIGN KEY (driverId) REFERENCES Driver(id)
);


INSERT INTO Driver (name, email, phone, password) VALUES ('John Doe', ' jonDoe@example.com', '1234567890', 'password');   


drop table if exists Notification cascade;

drop table if exists ParkingAdmin cascade;

drop table if exists PenaltyPayment cascade;

drop table if exists Penalty cascade;

drop table if exists Reservation cascade;

drop table if exists Driver cascade;

drop table if exists ParkingSpot cascade;

drop table if exists ParkingLot cascade;

CREATE TABLE Driver
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    email           VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword  VARCHAR(255) NOT NULL,
    phoneNumber     VARCHAR(20)  NOT NULL UNIQUE,
    licensePlate    VARCHAR(20)  NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    unpaidPenalties BOOLEAN   DEFAULT FALSE,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create ParkingLots table
CREATE TABLE ParkingLot
(
    id                   INT PRIMARY KEY AUTO_INCREMENT,
    location             VARCHAR(255)   NOT NULL UNIQUE,
    name                 VARCHAR(255)   NOT NULL UNIQUE,
    capacity             INT            NOT NULL,
    availableSpots       INT            NOT NULL,
    basePrice            DECIMAL(10, 2) NOT NULL,
    reservationFactor    DECIMAL(10, 2) NOT NULL,
    availableSpotsFactor DECIMAL(10, 2) NOT NULL,
    active               BOOLEAN   DEFAULT TRUE,
    createdAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (availableSpots <= capacity)
);

-- Create ParkingAdmins table
CREATE TABLE ParkingAdmin
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    lotId          INT          NOT NULL,
    email          VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    phoneNumber    VARCHAR(20)  NOT NULL UNIQUE,
    SSN            VARCHAR(20)  NOT NULL UNIQUE,
    name           VARCHAR(255) NOT NULL,
    dateOfBirth    DATE         NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lotId) REFERENCES ParkingLot (id)
);

-- Create ParkingSpots table
CREATE TABLE ParkingSpot
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    parkingLotId INT                       NOT NULL,
    spotNumber   INT                       NOT NULL,
    size         ENUM ('regular', 'large') NOT NULL,
    type         ENUM ('gas', 'electric')  NOT NULL,
    handicapped  BOOLEAN DEFAULT FALSE,
    occupied     BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (parkingLotId) REFERENCES ParkingLot (id),
    UNIQUE KEY unique_spot_number (parkingLotId, spotNumber)
);

-- Create Reservations table
CREATE TABLE Reservation
(
    id                INT PRIMARY KEY AUTO_INCREMENT,
    driverId          INT                                     NOT NULL,
    spotId            INT                                     NOT NULL,
    status            ENUM ('active', 'completed', 'no-show') NOT NULL,
    checkIn           DATETIME,
    checkOut          DATETIME,
    scheduledCheckIn  DATETIME                                NOT NULL,
    scheduledCheckOut DATETIME                                NOT NULL,
    amount            DECIMAL(10, 2)                          NOT NULL,
    paymentMethod     VARCHAR(50)                             NOT NULL,
    transactionId     VARCHAR(255)                            NOT NULL,
    createdAt         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driverId) REFERENCES Driver (id),
    FOREIGN KEY (spotId) REFERENCES ParkingSpot (id),
    CHECK (scheduledCheckOut > scheduledCheckIn),
    CHECK (checkOut IS NULL OR checkOut > checkIn)
);

-- Create Penalties table
CREATE TABLE Penalty
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    reservationId INT                      NOT NULL,
    amount        DECIMAL(10, 2)           NOT NULL,
    reason        VARCHAR(255)             NOT NULL,
    status        ENUM ('paid', 'pending') NOT NULL DEFAULT 'pending',
    createdAt     TIMESTAMP                         DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservationId) REFERENCES Reservation (id)
);

-- Create PenaltyPayments table
CREATE TABLE PenaltyPayment
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    penaltyId     INT          NOT NULL,
    paymentMethod VARCHAR(50)  NOT NULL,
    transactionId VARCHAR(255) NOT NULL,
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (penaltyId) REFERENCES Penalty (id)
);

-- Create Notifications table
CREATE TABLE Notification
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    driverId  INT                                   NOT NULL,
    message   TEXT                                  NOT NULL,
    type      ENUM ('reminder', 'payment', 'alert') NOT NULL,
    status    ENUM ('sent', 'read')                 NOT NULL DEFAULT 'sent',
    priority  ENUM ('low', 'medium', 'high')        NOT NULL,
    createdAt TIMESTAMP                                      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driverId) REFERENCES Driver (id)
);

-- Add indexes for common queries and performance
CREATE INDEX idx_drivers_unpaid_penalties ON Driver (unpaidPenalties);
CREATE INDEX idx_parking_lots_active ON ParkingLot (active);
CREATE INDEX idx_reservations_status ON Reservation (status);
CREATE INDEX idx_notifications_status ON Notification (status);
CREATE INDEX idx_penalties_status ON Penalty (status);