DELIMITER //

CREATE PROCEDURE CheckForNoShows()
BEGIN
UPDATE Reservation
SET status = 'NO_SHOW'
WHERE status = 'PENDING'
  AND scheduledCheckIn < NOW() - INTERVAL 10 MINUTE;
END//

CREATE PROCEDURE CheckForLateCheckouts()
BEGIN
UPDATE Reservation
SET status = 'COMPLETED',
    checkOut = NOW()
WHERE status = 'ACTIVE'
  AND scheduledCheckOut < NOW();
END//

CREATE EVENT IF NOT EXISTS evt_check_no_shows
    ON SCHEDULE EVERY 5 MINUTE
    DO CALL CheckForNoShows();

CREATE EVENT IF NOT EXISTS evt_check_late_checkouts
    ON SCHEDULE EVERY 5 MINUTE
    DO CALL CheckForLateCheckouts();

SET GLOBAL event_scheduler = ON;

DELIMITER ;