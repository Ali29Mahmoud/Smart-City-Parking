CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    licence_plate VARCHAR(20),
    name VARCHAR(255),
    has_unpaid_penalties BOOLEAN DEFAULT FALSE,
    created_at DATE,
    updated_at DATE
);
