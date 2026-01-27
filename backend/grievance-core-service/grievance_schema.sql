-- Create database
CREATE DATABASE grievance_db;

-- Use database
USE grievance_db;

-- ==============================
-- Table: grievance_category
-- ==============================
CREATE TABLE grievance_category (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- ==============================
-- Table: grievances
-- ==============================
CREATE TABLE grievances (
    grievance_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_by_user_id BIGINT NOT NULL,
    assigned_authority_id BIGINT,
    category_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
        REFERENCES grievance_category(category_id)
);

-- ==============================
-- Table: grievance_media
-- ==============================
CREATE TABLE grievance_media (
    media_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    grievance_id BIGINT NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (grievance_id)
        REFERENCES grievances(grievance_id)
        ON DELETE CASCADE
);