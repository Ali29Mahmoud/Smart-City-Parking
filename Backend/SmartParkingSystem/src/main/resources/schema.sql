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


