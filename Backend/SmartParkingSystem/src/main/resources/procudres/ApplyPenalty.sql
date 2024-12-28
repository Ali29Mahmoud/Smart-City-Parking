DROP TRIGGER IF EXISTS tr_reservation_no_show;
DROP TRIGGER IF EXISTS tr_reservation_late_checkout;

DELIMITER //
CREATE TRIGGER tr_reservation_no_show
    AFTER UPDATE ON Reservation
    FOR EACH ROW
BEGIN
    IF NEW.status = 'NO_SHOW' THEN
        INSERT INTO Penalty (reservationId, amount, reason, status)
        VALUES (NEW.id,
                NEW.amount * 0.5,
                'No-show penalty - Failed to check in for reservation',
                'PENDING');

    UPDATE Users
    SET unpaidPenalties = TRUE
    WHERE id = NEW.userID;
END IF;
END//

CREATE TRIGGER tr_reservation_late_checkout
    AFTER UPDATE ON Reservation
    FOR EACH ROW
BEGIN
    IF NEW.checkOut IS NOT NULL
       AND NEW.status = 'COMPLETED'
       AND NEW.checkOut > NEW.scheduledCheckOut THEN

        SET @overtime_hours = CEILING(TIMESTAMPDIFF(MINUTE, NEW.scheduledCheckOut, NEW.checkOut) / 60);

        SET @penalty_amount = (NEW.amount * 0.25 * @overtime_hours);

    INSERT INTO Penalty (reservationId, amount, reason, status)
    VALUES (NEW.id,
            @penalty_amount,
            CONCAT('Late checkout penalty - ', @overtime_hours, ' hour(s) overtime'),
            'PENDING');

    UPDATE Users
    SET unpaidPenalties = TRUE
    WHERE id = NEW.userID;
END IF;
END//
DELIMITER ;