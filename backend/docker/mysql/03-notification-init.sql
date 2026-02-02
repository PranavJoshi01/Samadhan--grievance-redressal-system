CREATE DATABASE IF NOT EXISTS samadhan_notification_db;
USE samadhan_notification_db;

CREATE TABLE notification (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    is_read BIT(1) NOT NULL,
    created_at DATETIME(6) NOT NULL
);
