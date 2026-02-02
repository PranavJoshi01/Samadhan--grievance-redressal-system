CREATE DATABASE IF NOT EXISTS grievance_db;
USE grievance_db;

CREATE TABLE grievance_category (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE grievances (
    grievance_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255),
    status ENUM('CLOSED','IN_PROGRESS','PENDING','RESOLVED') NOT NULL,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    assigned_authority_id BIGINT,
    created_by_user_id BIGINT,
    created_by_user_email VARCHAR(255),
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES grievance_category(category_id)
);

CREATE TABLE grievance_media (
    media_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    media_type VARCHAR(50),
    media_url VARCHAR(500) NOT NULL,
    uploaded_at DATETIME(6),
    grievance_id BIGINT NOT NULL,
    FOREIGN KEY (grievance_id) REFERENCES grievances(grievance_id)
);

CREATE TABLE feedback (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    grievance_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    user_email VARCHAR(255),
    dept_id BIGINT,
    message VARCHAR(1000),
    rating INT,
    created_at DATETIME(6),
    FOREIGN KEY (grievance_id) REFERENCES grievances(grievance_id)
);
