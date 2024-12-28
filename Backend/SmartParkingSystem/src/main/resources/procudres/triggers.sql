DELIMITER //

CREATE TRIGGER set_default_status_after_insert
BEFORE INSERT ON Notification
FOR EACH ROW
BEGIN
    IF NEW.status IS NULL THEN
        SET NEW.status = 'SENT';
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER set_alert_priority
BEFORE INSERT ON Notification
FOR EACH ROW
BEGIN
    IF NEW.type = 'ALERT' THEN
        SET NEW.priority = 'HIGH';
    END IF;
END;
DELIMITER ;