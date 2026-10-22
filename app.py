import os
import sys
import math
import uuid

# Windows console encoding safeguard
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from config import Config
from db import (
    init_db,
    get_active_engine,
    test_mysql_connection,
    get_body_parts,
    get_symptoms,
    get_symptom_by_slug,
    get_emergency_flags,
    get_specialties,
    get_specialty_by_slug,
    get_doctors,
    get_available_cities,
    log_consultation,
    _MYSQL_CONFIG
)
from rule_engine import evaluate_symptoms

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize database on startup (Attempts MySQL, falls back to SQLite)
db_engine, db_msg = init_db()
print(f"[*] MediGuide Database initialized: {db_engine.upper()} -> {db_msg}")


def calculate_distance_km(lat1, lon1, lat2, lon2):
    """Haversine formula to compute geodesic distance between two points in km."""
    if not lat1 or not lon1 or not lat2 or not lon2:
        return None
    try:
        lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
        if lat1 == 0.0 and lon1 == 0.0:
            return None
        r = 6371.0  # Earth's radius in kilometers
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(r * c, 1)
    except Exception:
        return None


# ------------------ Web Routes ------------------

@app.route("/")
def index():
    return render_template("index.html")


# ------------------ RESTful API Endpoints ------------------

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "app_name": "MediGuide",
        "version": "1.0.0",
        "database_engine": get_active_engine(),
        "mysql_available": True
    })


@app.route("/api/body-parts", methods=["GET"])
def list_body_parts():
    parts = get_body_parts()
    return jsonify({
        "status": "success",
        "data": parts
    })


@app.route("/api/symptoms", methods=["GET"])
def list_symptoms():
    body_part = request.args.get("body_part")
    search = request.args.get("search")
    symptoms = get_symptoms(body_part_slug=body_part, search_query=search)
    return jsonify({
        "status": "success",
        "count": len(symptoms),
        "data": symptoms
    })


@app.route("/api/emergency-flags", methods=["GET"])
def list_emergency_flags():
    flags = get_emergency_flags()
    return jsonify({
        "status": "success",
        "data": flags
    })


@app.route("/api/specialties", methods=["GET"])
def list_specialties():
    specs = get_specialties()
    return jsonify({
        "status": "success",
        "data": specs
    })


@app.route("/api/specialties/<slug>", methods=["GET"])
def get_specialty(slug):
    spec = get_specialty_by_slug(slug)
    if not spec:
        return jsonify({"status": "error", "message": "Specialty not found"}), 404
    return jsonify({
        "status": "success",
        "data": spec
    })


@app.route("/api/cities", methods=["GET"])
def list_cities():
    cities = get_available_cities()
    return jsonify({
        "status": "success",
        "data": cities
    })


@app.route("/api/doctors", methods=["GET"])
def list_doctors():
    specialty = request.args.get("specialty")
    city = request.args.get("city")
    query = request.args.get("query")
    user_lat = request.args.get("lat")
    user_lng = request.args.get("lng")
    
    doctors = get_doctors(specialty_slug=specialty, city=city, query=query, limit=50)

    # Calculate distance if user coordinates provided
    enriched_doctors = []
    for doc in doctors:
        doc_dict = dict(doc)
        dist = calculate_distance_km(user_lat, user_lng, doc_dict.get("latitude"), doc_dict.get("longitude"))
        doc_dict["distance_km"] = dist
        # Generate Google Maps and OpenStreetMap URLs
        query_str = f"{doc_dict['name']} {doc_dict['clinic_or_hospital']} {doc_dict['address']} {doc_dict['city']}"
        doc_dict["maps_url"] = f"https://www.google.com/maps/search/?api=1&query={query_str.replace(' ', '+')}"
        doc_dict["osm_url"] = f"https://www.openstreetmap.org/search?query={query_str.replace(' ', '+')}"
        enriched_doctors.append(doc_dict)

    if user_lat and user_lng:
        # Sort by distance if available
        enriched_doctors.sort(key=lambda d: (d["distance_km"] is None, d["distance_km"] or 999999))

    return jsonify({
        "status": "success",
        "count": len(enriched_doctors),
        "data": enriched_doctors
    })


@app.route("/api/evaluate", methods=["POST"])
def evaluate_care_guidance():
    data = request.get_json() or {}
    primary_symptom_slug = data.get("primary_symptom")
    secondary_symptom_slugs = data.get("secondary_symptoms", [])
    severity = data.get("severity", "moderate")
    duration = data.get("duration", "days_1_3")
    red_flags_checked = data.get("red_flags", [])
    age_group = data.get("age_group", "adult")
    user_city = data.get("city", "Chennai")
    user_lat = data.get("lat")
    user_lng = data.get("lng")

    if not primary_symptom_slug:
        return jsonify({
            "status": "error",
            "message": "Please choose at least one primary symptom to evaluate."
        }), 400

    # Execute rule engine
    guidance = evaluate_symptoms(
        primary_symptom_slug=primary_symptom_slug,
        secondary_symptom_slugs=secondary_symptom_slugs,
        severity=severity,
        duration=duration,
        red_flags_checked=red_flags_checked,
        age_group=age_group
    )

    if "error" in guidance:
        return jsonify({"status": "error", "message": guidance["error"]}), 400

    # Fetch matching doctors for recommended specialty
    rec_spec_slug = guidance["recommended_specialty"].get("slug")
    if rec_spec_slug == "emergency_medicine":
        # For emergencies, search hospital emergency rooms or primary care/cardiology
        rec_spec_slug = guidance.get("secondary_specialty", {}).get("slug", "general_physician")

    nearby_docs = get_doctors(specialty_slug=rec_spec_slug, city=user_city, limit=8)
    if not nearby_docs:
        # Fallback to any doctors in city or all doctors of that specialty
        nearby_docs = get_doctors(specialty_slug=rec_spec_slug, limit=8)

    docs_list = []
    for doc in nearby_docs:
        doc_dict = dict(doc)
        dist = calculate_distance_km(user_lat, user_lng, doc_dict.get("latitude"), doc_dict.get("longitude"))
        doc_dict["distance_km"] = dist
        query_str = f"{doc_dict['name']} {doc_dict['clinic_or_hospital']} {doc_dict['address']} {doc_dict['city']}"
        doc_dict["maps_url"] = f"https://www.google.com/maps/search/?api=1&query={query_str.replace(' ', '+')}"
        docs_list.append(doc_dict)

    guidance["recommended_doctors"] = docs_list

    # Log session anonymously
    session_id = str(uuid.uuid4())
    try:
        log_consultation(
            session_id=session_id,
            body_part=guidance["primary_symptom"].get("body_part_slug", "general"),
            symptoms_json=str([primary_symptom_slug] + secondary_symptom_slugs),
            severity=severity,
            duration=duration,
            triage_level=guidance["triage_level"],
            recommended_specialty=guidance["recommended_specialty"].get("slug"),
            emergency_flag=len(guidance.get("emergency_flags", [])) > 0,
            user_city=user_city
        )
    except Exception as e:
        print(f"[!] Log consultation warning: {e}")

    guidance["session_id"] = session_id
    return jsonify({
        "status": "success",
        "data": guidance
    })


@app.route("/api/db/status", methods=["GET"])
def db_status():
    return jsonify({
        "active_engine": get_active_engine(),
        "mysql_config": {
            "host": _MYSQL_CONFIG["host"],
            "user": _MYSQL_CONFIG["user"],
            "database": _MYSQL_CONFIG["database"],
            "port": _MYSQL_CONFIG["port"]
        }
    })


@app.route("/api/db/test-connection", methods=["POST"])
def db_test_connection():
    data = request.get_json() or {}
    host = data.get("host", "localhost")
    user = data.get("user", "root")
    password = data.get("password", "")
    port = data.get("port", 3306)
    database = data.get("database", "mediguide_db")

    success, message = test_mysql_connection(host, user, password, port, database)
    return jsonify({
        "status": "success" if success else "error",
        "connected": success,
        "message": message
    })


@app.route("/api/db/switch-mysql", methods=["POST"])
def db_switch_mysql():
    global _ACTIVE_ENGINE, _MYSQL_CONFIG
    data = request.get_json() or {}
    host = data.get("host", "localhost")
    user = data.get("user", "root")
    password = data.get("password", "")
    port = int(data.get("port", 3306))
    database = data.get("database", "mediguide_db")

    success, message = test_mysql_connection(host, user, password, port, database)
    if not success:
        return jsonify({"status": "error", "message": f"Connection failed: {message}"}), 400

    _MYSQL_CONFIG["host"] = host
    _MYSQL_CONFIG["user"] = user
    _MYSQL_CONFIG["password"] = password
    _MYSQL_CONFIG["port"] = port
    _MYSQL_CONFIG["database"] = database

    # Reinitialize with MySQL
    engine, msg = init_db(force_sqlite=False)
    return jsonify({
        "status": "success",
        "active_engine": engine,
        "message": f"Successfully switched to MySQL database '{database}'! {msg}"
    })


if __name__ == "__main__":
    print("=======================================================")
    print(" [i] MediGuide - Smart Healthcare Symptom Guidance App ")
    print(" Server starting on http://127.0.0.1:5000 ")
    print("=======================================================")
    app.run(host="127.0.0.1", port=5000, debug=False)
