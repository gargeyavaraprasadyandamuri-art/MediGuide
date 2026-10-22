-- =======================================================
-- MediGuide Database Schema (MySQL Compatible)
-- Smart Healthcare Symptom Guidance Website
-- =======================================================

CREATE DATABASE IF NOT EXISTS mediguide_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mediguide_db;

-- 1. Specialties Table
CREATE TABLE IF NOT EXISTS specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    icon VARCHAR(64) DEFAULT 'user-md',
    category VARCHAR(64) DEFAULT 'Specialist',
    description TEXT NOT NULL,
    what_they_do TEXT NOT NULL,
    typical_evaluations TEXT NOT NULL,
    questions_to_ask TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Body Parts Table
CREATE TABLE IF NOT EXISTS body_parts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    view_type ENUM('front', 'back', 'both') DEFAULT 'both',
    description VARCHAR(255),
    svg_element_id VARCHAR(64),
    display_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Symptoms Table
CREATE TABLE IF NOT EXISTS symptoms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    body_part_slug VARCHAR(64) NOT NULL,
    default_specialty_slug VARCHAR(64) NOT NULL,
    description TEXT,
    is_emergency_flag BOOLEAN DEFAULT FALSE,
    emergency_warning_text VARCHAR(255) DEFAULT NULL,
    typical_severity ENUM('mild', 'moderate', 'severe') DEFAULT 'moderate',
    common_triggers VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (body_part_slug),
    INDEX (default_specialty_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Emergency Red Flags Table
CREATE TABLE IF NOT EXISTS emergency_red_flags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    body_part_slug VARCHAR(64),
    symptom_slug VARCHAR(64),
    immediate_action VARCHAR(255) NOT NULL,
    risk_level ENUM('critical', 'high') DEFAULT 'critical',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Care Guidance Rules Table
CREATE TABLE IF NOT EXISTS care_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(150) NOT NULL,
    body_part_slug VARCHAR(64),
    primary_symptom_slug VARCHAR(64) NOT NULL,
    secondary_symptom_slug VARCHAR(64) DEFAULT NULL,
    min_severity ENUM('mild', 'moderate', 'severe') DEFAULT 'mild',
    min_duration ENUM('hours', 'days_1_3', 'days_4_7', 'weeks_1_2', 'chronic') DEFAULT 'hours',
    recommended_specialty_slug VARCHAR(64) NOT NULL,
    secondary_specialty_slug VARCHAR(64) DEFAULT 'general_physician',
    triage_level ENUM('EMERGENCY', 'URGENT_SPECIALIST', 'SPECIALIST_CONSULT', 'PRIMARY_CARE', 'SELF_CARE_MONITOR') DEFAULT 'SPECIALIST_CONSULT',
    explanation TEXT NOT NULL,
    priority INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (primary_symptom_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Doctors / Clinics Table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(100) DEFAULT 'MD, MBBS',
    specialty_slug VARCHAR(64) NOT NULL,
    clinic_or_hospital VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT '',
    country VARCHAR(100) DEFAULT 'India',
    postal_code VARCHAR(20) DEFAULT '',
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    rating DECIMAL(2, 1) DEFAULT 4.8,
    reviews_count INT DEFAULT 42,
    consultation_fee VARCHAR(50) DEFAULT '₹500 - ₹800',
    available_hours VARCHAR(100) DEFAULT 'Mon-Sat: 09:00 AM - 06:00 PM',
    accepts_telehealth BOOLEAN DEFAULT TRUE,
    latitude DECIMAL(10, 6) DEFAULT 0.0,
    longitude DECIMAL(10, 6) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (specialty_slug),
    INDEX (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Consultation Logs (Anonymous / Session tracking)
CREATE TABLE IF NOT EXISTS consultation_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64),
    selected_body_part VARCHAR(64),
    symptoms_json TEXT,
    severity VARCHAR(20),
    duration VARCHAR(30),
    triage_level VARCHAR(30),
    recommended_specialty VARCHAR(64),
    emergency_flag_triggered BOOLEAN DEFAULT FALSE,
    user_city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
