CREATE DATABASE IF NOT EXISTS samadhan_auth_db;
USE samadhan_auth_db;

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255),
    role ENUM('ADMIN','AUTHORITY','USER'),
    phone_number VARCHAR(255) UNIQUE,
    dept_id BIGINT,
    dept_name VARCHAR(255)
);
