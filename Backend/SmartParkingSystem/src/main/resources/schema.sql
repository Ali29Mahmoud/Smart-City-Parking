drop table if exists Notification cascade;

drop table if exists ParkingAdmin cascade;

drop table if exists PenaltyPayment cascade;

drop table if exists Penalty cascade;

drop table if exists Reservation cascade;

drop table if exists Users cascade;

drop table if exists ParkingSpot cascade;

drop table if exists ParkingLot cascade;

CREATE TABLE Users
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    email           VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword  VARCHAR(255) NOT NULL,
    phoneNumber     VARCHAR(20)  NOT NULL UNIQUE,
    licensePlate    VARCHAR(20)  NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    unpaidPenalties BOOLEAN   DEFAULT FALSE,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role            VARCHAR(50)
);

-- Create ParkingLots table
CREATE TABLE ParkingLot
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    location       VARCHAR(255)   NOT NULL UNIQUE,
    name           VARCHAR(255)   NOT NULL UNIQUE,
    capacity       INT            NOT NULL,
    availableSpots INT            NOT NULL,
    basePrice      DECIMAL(10, 2) NOT NULL,
    demandFactor   DECIMAL(10, 2) NOT NULL,
    evFactor       DECIMAL(10, 2) NOT NULL,
    timeLimit      INT            NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    parkingLotId INT                                   NOT NULL,
    spotNumber   INT                                   NOT NULL,
    size         ENUM ('REGULAR', 'LARGE')             NOT NULL,
    type         ENUM ('GAS', 'ELECTRIC')              NOT NULL,
    handicapped  BOOLEAN                                        DEFAULT FALSE,
    status       ENUM ('FREE', 'OCCUPIED', 'RESERVED') NOT NULL DEFAULT 'FREE',
    FOREIGN KEY (parkingLotId) REFERENCES ParkingLot (id),
    UNIQUE KEY unique_spot_number (parkingLotId, spotNumber)
);

-- Create Reservations table
CREATE TABLE Reservation
(
    id                INT PRIMARY KEY AUTO_INCREMENT,
    userID          INT                                               NOT NULL,
    spotId            INT                                               NOT NULL,
    status            ENUM ('PENDING','ACTIVE', 'COMPLETED', 'NO_SHOW') NOT NULL,
    checkIn           DATETIME,
    checkOut          DATETIME,
    scheduledCheckIn  DATETIME                                          NOT NULL,
    scheduledCheckOut DATETIME                                          NOT NULL,
    amount            DECIMAL(10, 2)                                    NOT NULL,
    paymentMethod     VARCHAR(50)                                       NOT NULL,
    transactionId     VARCHAR(255)                                      NOT NULL,
    createdAt         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users (id),
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
    status        ENUM ('PAID', 'PENDING') NOT NULL DEFAULT 'PENDING',
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
    userID  INT                                   NOT NULL,
    message   TEXT                                  NOT NULL,
    type      ENUM ('REMINDER', 'PAYMENT', 'ALERT') NOT NULL,
    status    ENUM ('SENT', 'READ')                 NOT NULL DEFAULT 'sent',
    priority  ENUM ('LOW', 'MEDIUM', 'HIGH')        NOT NULL,
    createdAt TIMESTAMP                                      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users (id)
);

-- Add indexes for common queries and performance
CREATE INDEX idx_drivers_unpaid_penalties ON Users (unpaidPenalties);
CREATE INDEX idx_parking_lots_active ON ParkingLot (active);
CREATE INDEX idx_reservations_status ON Reservation (status);
CREATE INDEX idx_notifications_status ON Notification (status);
CREATE INDEX idx_penalties_status ON Penalty (status);
DROP PROCEDURE IF EXISTS CreateMultipleParkingSpots;