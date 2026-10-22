# MediGuide — Smart Healthcare Symptom Guidance & Doctor Discovery 🏥

> **Core Philosophy:** MediGuide provides **transparent, rule-based care-navigation guidance, NOT a medical diagnosis**. Rather than pretending a symptom alone can identify complex pathology, MediGuide directs patients to the right medical specialty, prioritizes emergency red flags, and facilitates nearby doctor discovery.

---

## 🌟 Key Features

1. **Biometric Hologram Anatomical Scanner (Front & Dorsal Views)**
   - Anatomical SVG body model with glowing highlights, laser scanning beam animation (`scanline`), and hover tooltips.
   - **Organ Systems Filter Ribbon**: Focus on `⚡ All Systems`, `🧠 Neurological`, `❤️ Cardiopulmonary`, `🥣 Gastrointestinal`, `🦴 Spine & Joints`, or `🧴 Cutaneous`.
   - **Pulsing Vital Telemetry Nodes**: Real-time pulsing radar rings on critical anatomical organs (Brain, Ocular, Carotid, Heart, Lungs, Stomach, Lumbar Spine, Joints).
   - **Biometric Scan HUD Readout**: Displays active scan coordinates, organ tissue classification, and quick symptom filtering.

2. **Real-Time Live ECG Wave Telemetry & Audio Synthesizer**
   - Live HTML5 `<canvas>` hospital telemetry monitor continuously drawing a glowing cyan P-Q-R-S-T cardiac waveform with live heart rate (BPM) readouts.
   - Dynamic BPM acceleration: Automatically increases telemetry pulse rate if emergency red flags are detected.
   - **Web Audio Chime Synthesizer**: Subtle, harmonic futuristic medical audio feedback on interactive selections (with instant mute/unmute 🔊/🔇 toggle).

3. **Dual Theme Engine (Dark Hologram / Clean Clinical Glass)**
   - **Dark Hologram Theme**: Deep obsidian background with bioluminescent cyan, sapphire blue, and neon frosted glass.
   - **Clean Clinical Light Glass**: Crisp, professional daylight mode with soft cyan glassmorphism.
   - Instant 1-click theme switcher in the sticky navigation bar (🌙 / ☀️).

4. **Interactive 1–10 Pain Intensity Dial & Timeline Wheel**
   - Interactive pain dial slider with dynamic reactive emoji expressions:
     - `1–3`: 😊 Mild Discomfort
     - `4–6`: 😐 Moderate Pain (Interferes with Activities)
     - `7–8`: 😣 Severe Pain (Debilitating)
     - `9–10`: 🚨 Acute Emergency Level (Emergency alert protocol)
   - Synchronizes with clinical rule evaluation and synthesizes harmonic audio cues.

5. **Diagnostic Pathway Flow & Digital Healthcare Referral Passport**
   - **Visual Care Pathway Flow**: Interactive step-by-step node diagram (`Your Symptom` ➔ `Evaluated Rule` ➔ `Suggested Specialty` ➔ `First Recommended Tests`).
   - **Digital Healthcare Referral Passport**: Boarding-pass style digital care slip with simulated verification QR code, unique session reference ID (`MG-XXXXXX`), urgency status, and 1-click print support.

3. **Emergency Red Flag Safety Checks**
   - High-priority detection of critical warning signs:
     - Severe crushing chest pain radiating to arm/jaw (Heart attack)
     - Sudden facial droop, arm weakness, or slurred speech (FAST stroke signs)
     - Severe acute respiratory distress / gasping at rest
     - Sudden thunderclap headache (intracranial hemorrhage risk)
     - High fever with stiff neck and confusion (meningitis)
     - Vomiting blood or black tarry stools (active GI bleed)
     - Sudden vision loss or flashes of light
     - Severe back pain with loss of bowel/bladder control (Cauda Equina Syndrome)
   - Triggers an **Emergency Strobe Banner**, immediate hospital emergency department routing, and one-tap **112 / 911 / 108 / 999** calling.

4. **Transparent, Rule-Based Specialty Guidance**
   - Suggests a **General Physician / Family Doctor** or relevant **Specialist** (Cardiologist, Neurologist, Pulmonologist, Gastroenterologist, Dermatologist, Orthopedist, ENT, Ophthalmologist, Rheumatologist, Psychiatrist, etc.).
   - **Explainable Care Logic**: Step-by-step audit trail showing exactly which clinical rule triggered the guidance.
   - **What to Expect**: Explains what the specialist does and typical evaluations (e.g. ECG, Spirometry, Endoscopy, MRI, Blood work).
   - **Doctor Consultation Preparation Checklist**: Questions to ask your doctor, timeline notes, and current medication tracking with 1-click print support.

5. **Nearby Doctor Discovery & Map Navigation**
   - Browse verified doctors and clinics filtered by specialty and city.
   - **HTML5 Geolocation**: "Use My Current Location" calculates geodesic distance in kilometers.
   - Direct navigation links to **Google Maps** and **OpenStreetMap**.
   - Interactive **Consultation Booking Modal** with booking reference generation and printable slips.

6. **Resilient Database Layer (MySQL + SQLite)**
   - Native support for **MySQL 8.0+** using `mysql-connector-python`.
   - Automatic zero-config **SQLite fallback** (`mediguide.db`) if MySQL credentials are not yet entered.
   - Live **Database Status Pill** in the top navigation bar with an interactive configuration modal to test MySQL credentials and switch engines on the fly.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Vanilla CSS design system, Glassmorphism, Responsive Grid, SVG Body Model |
| **Backend** | Python 3.10+ / Flask | RESTful API endpoints, CORS enabled |
| **Database** | MySQL 8.0+ / SQLite 3 | `mysql-connector-python`, resilient connection manager |
| **Care Engine** | Python Rule-Based Navigation | Deterministic, clinical rule matching & explainable triage |
| **Mapping** | Google Maps & OpenStreetMap | Location search query generation & Haversine distance calculator |

---

## 📂 Project Architecture

```
MediGuide/
├── app.py                 # Flask application server & RESTful API routes
├── config.py              # Environment configuration & DB connection parameters
├── db.py                  # Resilient DB manager (MySQL Connector with SQLite fallback)
├── rule_engine.py         # Transparent, rule-based healthcare guidance engine
├── seed_data.py           # Comprehensive seed dataset (Specialties, Symptoms, Rules, Doctors)
├── schema.sql             # Pure MySQL schema script
├── mediguide.db           # SQLite database file (created on initialization)
├── static/
│   ├── css/
│   │   ├── style.css          # Design system, global tokens, typography, layout
│   │   ├── body-diagram.css   # Anatomical SVG styling, glowing hover states, tooltips
│   │   └── components.css     # Form controls, triage cards, doctor cards, modals
│   └── js/
│       ├── api.js             # REST API client wrapper
│       ├── body-diagram.js    # Interactive SVG body controller (Front/Back views)
│       ├── symptom-form.js    # Symptom search, severity, duration & red flags
│       ├── guidance.js        # Care guidance result view & appointment checklist
│       ├── doctor-finder.js   # Nearby doctor directory, GPS location & map links
│       └── app.js             # Main application orchestrator & modal controllers
└── templates/
    └── index.html             # Responsive single-page web app template
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10 or higher
- Installed packages: `flask`, `flask-cors`, `mysql-connector-python` (already available in environment)
- Optional: MySQL Server 8.0 (if connecting to local MySQL instance)

### 2. Starting the Application
From the project directory:
```bash
py app.py
```
Or with standard python:
```bash
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

### 3. Database Configuration (MySQL & SQLite)
- **Out of the box**: If MySQL is not running or credentials require a password, MediGuide starts immediately on its SQLite fallback (`mediguide.db`) with 100% of features active.
- **Connecting to MySQL**:
  1. Click the **`DB: SQLite`** badge in the top navigation bar.
  2. Enter your MySQL root password (e.g., Host: `localhost`, User: `root`, Port: `3306`, Database: `mediguide_db`).
  3. Click **"Test Connection"** to verify, then click **"Switch & Sync to MySQL"**.
  4. The application will create `mediguide_db` and seed all tables automatically.

Alternatively, set environment variables before running:
```bash
$env:MYSQL_USER = "root"
$env:MYSQL_PASSWORD = "your_mysql_password"
$env:MYSQL_DATABASE = "mediguide_db"
py app.py
```

---

## 📡 RESTful API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check, active DB engine (`mysql` or `sqlite`) |
| `GET` | `/api/body-parts` | List of anatomical body regions with view types |
| `GET` | `/api/symptoms` | Search symptoms with optional `body_part` and `search` query |
| `GET` | `/api/emergency-flags` | List of life-threatening red flag warning signs |
| `GET` | `/api/specialties` | List of all 15+ medical specialties with role details |
| `GET` | `/api/doctors` | List doctors with filters (`specialty`, `city`, `query`, `lat`, `lng`) |
| `POST` | `/api/evaluate` | Evaluates symptoms, severity, duration, and red flags; returns triage and care guidance |
| `POST` | `/api/db/test-connection` | Tests MySQL connection credentials |
| `POST` | `/api/db/switch-mysql` | Switches active database engine to MySQL dynamically |

---

## ⚖️ Clinical & Legal Notice
MediGuide is designed strictly for **educational and care-navigation purposes**. It is not a diagnostic device, does not establish a doctor-patient relationship, and does not replace the judgment of a licensed medical practitioner. In the event of a medical emergency, immediately contact local emergency medical services (112 / 911 / 108 / 999) or visit the nearest hospital emergency room.
