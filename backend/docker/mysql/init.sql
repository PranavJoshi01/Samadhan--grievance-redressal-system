CREATE DATABASE IF NOT EXISTS samadhan_auth_db;
CREATE DATABASE IF NOT EXISTS grievance_db;
CREATE DATABASE IF NOT EXISTS samadhan_notification_db;

CREATE USER IF NOT EXISTS 'samadhan'@'%' IDENTIFIED BY 'samadhan123';
GRANT ALL PRIVILEGES ON samadhan_auth_db.* TO 'samadhan'@'%';
GRANT ALL PRIVILEGES ON grievance_db.* TO 'samadhan'@'%';
GRANT ALL PRIVILEGES ON samadhan_notification_db.* TO 'samadhan'@'%';

FLUSH PRIVILEGES;
