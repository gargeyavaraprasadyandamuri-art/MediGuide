"""
Database Layer for MediGuide
Supports MySQL (via mysql-connector-python) with automatic fallback to SQLite.
Ensures zero-downtime, local zero-config testing while keeping full MySQL readiness.
"""

import os
import sqlite3
import logging
from config import Config
from seed_data import SPECIALTIES, BODY_PARTS, SYMPTOMS, EMERGENCY_RED_FLAGS, CARE_RULES, DOCTORS

try:
    import mysql.connector
    from mysql.connector import errorcode
    MYSQL_AVAILABLE = True
except ImportError:
    MYSQL_AVAILABLE = False

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("MediGuideDB")

_ACTIVE_ENGINE = "sqlite" # 'mysql' or 'sqlite'
_MYSQL_CONFIG = {
    "host": Config.MYSQL_HOST,
    "user": Config.MYSQL_USER,
    "password": Config.MYSQL_PASSWORD,
    "database": Config.MYSQL_DATABASE,
    "port": Config.MYSQL_PORT,
}


def get_active_engine():
    return _ACTIVE_ENGINE


def test_mysql_connection(host, user, password, port=3306, database="mediguide_db"):
    """Tests if a MySQL connection can be established with provided credentials."""
    if not MYSQL_AVAILABLE:
        return False, "mysql-connector-python is not installed."
    try:
        cnx = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            port=int(port),
            connect_timeout=3
        )
        cursor = cnx.cursor()
        cursor.execute("SELECT VERSION()")
        version = cursor.fetchone()[0]
        cursor.close()
        cnx.close()
        return True, f"Connected to MySQL {version} successfully."
    except Exception as e:
        return False, str(e)


def init_db(force_sqlite=False):
    """
    Initializes the database schema and seeds initial data.
    Attempts MySQL first (if configured and not force_sqlite), falls back to SQLite.
    """
    global _ACTIVE_ENGINE
    
    if not force_sqlite and MYSQL_AVAILABLE:
        try:
            # First connect to server without database to create it if needed
            server_cnx = mysql.connector.connect(
                host=_MYSQL_CONFIG["host"],
                user=_MYSQL_CONFIG["user"],
                password=_MYSQL_CONFIG["password"],
                port=_MYSQL_CONFIG["port"],
                connect_timeout=3
            )
            server_cursor = server_cnx.cursor()
            server_cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{_MYSQL_CONFIG['database']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            server_cursor.close()
            server_cnx.close()

            # Now connect to database
            cnx = mysql.connector.connect(
                host=_MYSQL_CONFIG["host"],
                user=_MYSQL_CONFIG["user"],
                password=_MYSQL_CONFIG["password"],
                database=_MYSQL_CONFIG["database"],
                port=_MYSQL_CONFIG["port"],
                connect_timeout=3
            )
            _ACTIVE_ENGINE = "mysql"
            logger.info("Successfully connected to MySQL database: %s", _MYSQL_CONFIG["database"])
            _create_tables_mysql(cnx)
            _seed_data_mysql(cnx)
            cnx.close()
            return "mysql", f"MySQL connected ({_MYSQL_CONFIG['database']})"
        except Exception as e:
            logger.warning("MySQL connection could not be established (%s). Falling back gracefully to SQLite.", e)
            _ACTIVE_ENGINE = "sqlite"
    else:
        _ACTIVE_ENGINE = "sqlite"

    # SQLite Fallback initialization
    logger.info("Initializing SQLite database at: %s", Config.SQLITE_PATH)
    conn = sqlite3.connect(Config.SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    _create_tables_sqlite(conn)
    _seed_data_sqlite(conn)
    conn.close()
    return "sqlite", f"Running on SQLite fallback ({os.path.basename(Config.SQLITE_PATH)})"


def get_connection():
    """Returns an active database connection depending on the active engine."""
    global _ACTIVE_ENGINE
    if _ACTIVE_ENGINE == "mysql" and MYSQL_AVAILABLE:
        try:
            return mysql.connector.connect(
                host=_MYSQL_CONFIG["host"],
                user=_MYSQL_CONFIG["user"],
                password=_MYSQL_CONFIG["password"],
                database=_MYSQL_CONFIG["database"],
                port=_MYSQL_CONFIG["port"]
            )
        except Exception as e:
            logger.error("MySQL connection error during query, switching to SQLite: %s", e)
            _ACTIVE_ENGINE = "sqlite"

    conn = sqlite3.connect(Config.SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ------------------ MySQL Table Creation & Seeding ------------------

def _create_tables_mysql(cnx):
    cursor = cnx.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS specialties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(64) UNIQUE NOT NULL,
        name VARCHAR(120) NOT NULL,
        icon VARCHAR(64) DEFAULT 'stethoscope',
        category VARCHAR(64) DEFAULT 'Specialist',
        description TEXT NOT NULL,
        what_they_do TEXT NOT NULL,
        typical_evaluations TEXT NOT NULL,
        questions_to_ask TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS body_parts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(64) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        view_type ENUM('front', 'back', 'both') DEFAULT 'both',
        description VARCHAR(255),
        svg_element_id VARCHAR(64),
        display_order INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)

    cursor.execute("""
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)

    cursor.execute("""
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
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS care_rules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rule_name VARCHAR(150) NOT NULL,
        body_part_slug VARCHAR(64),
        primary_symptom_slug VARCHAR(64) NOT NULL,
        secondary_symptom_slug VARCHAR(64) DEFAULT NULL,
        min_severity VARCHAR(20) DEFAULT 'mild',
        min_duration VARCHAR(30) DEFAULT 'hours',
        recommended_specialty_slug VARCHAR(64) NOT NULL,
        secondary_specialty_slug VARCHAR(64) DEFAULT 'general_physician',
        triage_level VARCHAR(30) DEFAULT 'SPECIALIST_CONSULT',
        explanation TEXT NOT NULL,
        priority INT DEFAULT 10,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)

    cursor.execute("""
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """)

    cursor.execute("""
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
    """)

    cnx.commit()
    cursor.close()


def _seed_data_mysql(cnx):
    cursor = cnx.cursor()
    cursor.execute("SELECT COUNT(*) FROM specialties")
    if cursor.fetchone()[0] == 0:
        logger.info("Seeding MySQL tables with MediGuide healthcare knowledge base...")
        # Specialties
        for s in SPECIALTIES:
            cursor.execute("""
            INSERT INTO specialties (slug, name, icon, category, description, what_they_do, typical_evaluations, questions_to_ask)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (s["slug"], s["name"], s["icon"], s["category"], s["description"], s["what_they_do"], s["typical_evaluations"], s["questions_to_ask"]))

        # Body Parts
        for b in BODY_PARTS:
            cursor.execute("""
            INSERT INTO body_parts (slug, name, view_type, description, svg_element_id, display_order)
            VALUES (%s, %s, %s, %s, %s, %s)
            """, (b["slug"], b["name"], b["view_type"], b["description"], b["svg_element_id"], b["display_order"]))

        # Symptoms
        for sym in SYMPTOMS:
            cursor.execute("""
            INSERT INTO symptoms (slug, name, body_part_slug, default_specialty_slug, description, is_emergency_flag, emergency_warning_text, typical_severity, common_triggers)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                sym["slug"],
                sym["name"],
                sym["body_part_slug"],
                sym["default_specialty_slug"],
                sym.get("description", ""),
                sym.get("is_emergency_flag", False),
                sym.get("emergency_warning_text"),
                sym.get("typical_severity", "moderate"),
                sym.get("common_triggers")
            ))

        # Emergency Red Flags
        for e in EMERGENCY_RED_FLAGS:
            cursor.execute("""
            INSERT INTO emergency_red_flags (slug, title, description, body_part_slug, symptom_slug, immediate_action, risk_level)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (e["slug"], e["title"], e["description"], e["body_part_slug"], e["symptom_slug"], e["immediate_action"], e["risk_level"]))

        # Care Rules
        for r in CARE_RULES:
            cursor.execute("""
            INSERT INTO care_rules (rule_name, body_part_slug, primary_symptom_slug, secondary_symptom_slug, min_severity, min_duration, recommended_specialty_slug, secondary_specialty_slug, triage_level, explanation, priority)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (r["rule_name"], r["body_part_slug"], r["primary_symptom_slug"], r["secondary_symptom_slug"], r["min_severity"], r["min_duration"], r["recommended_specialty_slug"], r["secondary_specialty_slug"], r["triage_level"], r["explanation"], r["priority"]))

        # Doctors
        for d in DOCTORS:
            cursor.execute("""
            INSERT INTO doctors (name, title, specialty_slug, clinic_or_hospital, address, city, state, country, phone, email, rating, reviews_count, consultation_fee, available_hours, accepts_telehealth, latitude, longitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (d["name"], d["title"], d["specialty_slug"], d["clinic_or_hospital"], d["address"], d["city"], d["state"], d["country"], d["phone"], d["email"], d["rating"], d["reviews_count"], d["consultation_fee"], d["available_hours"], d["accepts_telehealth"], d["latitude"], d["longitude"]))

        cnx.commit()
    cursor.close()


# ------------------ SQLite Table Creation & Seeding ------------------

def _create_tables_sqlite(conn):
    cursor = conn.cursor()
    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS specialties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        icon TEXT DEFAULT 'stethoscope',
        category TEXT DEFAULT 'Specialist',
        description TEXT NOT NULL,
        what_they_do TEXT NOT NULL,
        typical_evaluations TEXT NOT NULL,
        questions_to_ask TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS body_parts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        view_type TEXT DEFAULT 'both',
        description TEXT,
        svg_element_id TEXT,
        display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS symptoms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        body_part_slug TEXT NOT NULL,
        default_specialty_slug TEXT NOT NULL,
        description TEXT,
        is_emergency_flag BOOLEAN DEFAULT 0,
        emergency_warning_text TEXT DEFAULT NULL,
        typical_severity TEXT DEFAULT 'moderate',
        common_triggers TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS emergency_red_flags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        body_part_slug TEXT,
        symptom_slug TEXT,
        immediate_action TEXT NOT NULL,
        risk_level TEXT DEFAULT 'critical',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS care_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rule_name TEXT NOT NULL,
        body_part_slug TEXT,
        primary_symptom_slug TEXT NOT NULL,
        secondary_symptom_slug TEXT DEFAULT NULL,
        min_severity TEXT DEFAULT 'mild',
        min_duration TEXT DEFAULT 'hours',
        recommended_specialty_slug TEXT NOT NULL,
        secondary_specialty_slug TEXT DEFAULT 'general_physician',
        triage_level TEXT DEFAULT 'SPECIALIST_CONSULT',
        explanation TEXT NOT NULL,
        priority INTEGER DEFAULT 10,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT DEFAULT 'MD, MBBS',
        specialty_slug TEXT NOT NULL,
        clinic_or_hospital TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT DEFAULT '',
        country TEXT DEFAULT 'India',
        postal_code TEXT DEFAULT '',
        phone TEXT NOT NULL,
        email TEXT,
        rating REAL DEFAULT 4.8,
        reviews_count INTEGER DEFAULT 42,
        consultation_fee TEXT DEFAULT '₹500 - ₹800',
        available_hours TEXT DEFAULT 'Mon-Sat: 09:00 AM - 06:00 PM',
        accepts_telehealth BOOLEAN DEFAULT 1,
        latitude REAL DEFAULT 0.0,
        longitude REAL DEFAULT 0.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consultation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        selected_body_part TEXT,
        symptoms_json TEXT,
        severity TEXT,
        duration TEXT,
        triage_level TEXT,
        recommended_specialty TEXT,
        emergency_flag_triggered BOOLEAN DEFAULT 0,
        user_city TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    conn.commit()


def _seed_data_sqlite(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM specialties")
    if cursor.fetchone()[0] == 0:
        logger.info("Seeding SQLite database with MediGuide healthcare knowledge base...")
        # Specialties
        for s in SPECIALTIES:
            cursor.execute("""
            INSERT INTO specialties (slug, name, icon, category, description, what_they_do, typical_evaluations, questions_to_ask)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (s["slug"], s["name"], s["icon"], s["category"], s["description"], s["what_they_do"], s["typical_evaluations"], s["questions_to_ask"]))

        # Body Parts
        for b in BODY_PARTS:
            cursor.execute("""
            INSERT INTO body_parts (slug, name, view_type, description, svg_element_id, display_order)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (b["slug"], b["name"], b["view_type"], b["description"], b["svg_element_id"], b["display_order"]))

        # Symptoms
        for sym in SYMPTOMS:
            cursor.execute("""
            INSERT INTO symptoms (slug, name, body_part_slug, default_specialty_slug, description, is_emergency_flag, emergency_warning_text, typical_severity, common_triggers)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                sym["slug"],
                sym["name"],
                sym["body_part_slug"],
                sym["default_specialty_slug"],
                sym.get("description", ""),
                1 if sym.get("is_emergency_flag") else 0,
                sym.get("emergency_warning_text"),
                sym.get("typical_severity", "moderate"),
                sym.get("common_triggers")
            ))

        # Emergency Red Flags
        for e in EMERGENCY_RED_FLAGS:
            cursor.execute("""
            INSERT INTO emergency_red_flags (slug, title, description, body_part_slug, symptom_slug, immediate_action, risk_level)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (e["slug"], e["title"], e["description"], e["body_part_slug"], e["symptom_slug"], e["immediate_action"], e["risk_level"]))

        # Care Rules
        for r in CARE_RULES:
            cursor.execute("""
            INSERT INTO care_rules (rule_name, body_part_slug, primary_symptom_slug, secondary_symptom_slug, min_severity, min_duration, recommended_specialty_slug, secondary_specialty_slug, triage_level, explanation, priority)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (r["rule_name"], r["body_part_slug"], r["primary_symptom_slug"], r["secondary_symptom_slug"], r["min_severity"], r["min_duration"], r["recommended_specialty_slug"], r["secondary_specialty_slug"], r["triage_level"], r["explanation"], r["priority"]))

        # Doctors
        for d in DOCTORS:
            cursor.execute("""
            INSERT INTO doctors (name, title, specialty_slug, clinic_or_hospital, address, city, state, country, phone, email, rating, reviews_count, consultation_fee, available_hours, accepts_telehealth, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (d["name"], d["title"], d["specialty_slug"], d["clinic_or_hospital"], d["address"], d["city"], d["state"], d["country"], d["phone"], d["email"], d["rating"], d["reviews_count"], d["consultation_fee"], d["available_hours"], 1 if d["accepts_telehealth"] else 0, d["latitude"], d["longitude"]))

        conn.commit()


# ------------------ High Level Query API ------------------

def _fetch_all(query, params=()):
    conn = get_connection()
    if _ACTIVE_ENGINE == "mysql":
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query, params)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    else:
        cursor = conn.cursor()
        # Convert %s placeholders to ? for SQLite
        sqlite_query = query.replace("%s", "?")
        cursor.execute(sqlite_query, params)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows


def _fetch_one(query, params=()):
    rows = _fetch_all(query, params)
    return rows[0] if rows else None


def get_body_parts():
    return _fetch_all("SELECT * FROM body_parts ORDER BY display_order ASC")


def get_symptoms(body_part_slug=None, search_query=None):
    query = "SELECT * FROM symptoms WHERE 1=1"
    params = []
    if body_part_slug and body_part_slug != "all":
        query += " AND body_part_slug = %s"
        params.append(body_part_slug)
    if search_query:
        query += " AND (name LIKE %s OR description LIKE %s OR common_triggers LIKE %s)"
        pattern = f"%{search_query}%"
        params.extend([pattern, pattern, pattern])
    query += " ORDER BY is_emergency_flag DESC, name ASC"
    return _fetch_all(query, tuple(params))


def get_symptom_by_slug(slug):
    return _fetch_one("SELECT * FROM symptoms WHERE slug = %s", (slug,))


def get_emergency_flags():
    return _fetch_all("SELECT * FROM emergency_red_flags ORDER BY risk_level ASC, title ASC")


def get_care_rules():
    return _fetch_all("SELECT * FROM care_rules ORDER BY priority DESC")


def get_specialties():
    return _fetch_all("SELECT * FROM specialties ORDER BY name ASC")


def get_specialty_by_slug(slug):
    return _fetch_one("SELECT * FROM specialties WHERE slug = %s", (slug,))


def get_doctors(specialty_slug=None, city=None, query=None, limit=20):
    sql = "SELECT * FROM doctors WHERE 1=1"
    params = []
    if specialty_slug and specialty_slug != "all":
        sql += " AND specialty_slug = %s"
        params.append(specialty_slug)
    if city and city != "all":
        sql += " AND LOWER(city) = LOWER(%s)"
        params.append(city)
    if query:
        sql += " AND (name LIKE %s OR clinic_or_hospital LIKE %s OR address LIKE %s)"
        pat = f"%{query}%"
        params.extend([pat, pat, pat])
    sql += " ORDER BY rating DESC LIMIT %s"
    params.append(limit)
    return _fetch_all(sql, tuple(params))


def get_available_cities():
    rows = _fetch_all("SELECT DISTINCT city FROM doctors ORDER BY city ASC")
    return [r["city"] for r in rows]


def log_consultation(session_id, body_part, symptoms_json, severity, duration, triage_level, recommended_specialty, emergency_flag, user_city):
    conn = get_connection()
    if _ACTIVE_ENGINE == "mysql":
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO consultation_logs (session_id, selected_body_part, symptoms_json, severity, duration, triage_level, recommended_specialty, emergency_flag_triggered, user_city)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (session_id, body_part, symptoms_json, severity, duration, triage_level, recommended_specialty, emergency_flag, user_city))
        conn.commit()
        cursor.close()
    else:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO consultation_logs (session_id, selected_body_part, symptoms_json, severity, duration, triage_level, recommended_specialty, emergency_flag_triggered, user_city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (session_id, body_part, symptoms_json, severity, duration, triage_level, recommended_specialty, 1 if emergency_flag else 0, user_city))
        conn.commit()
    conn.close()
