"""
MediGuide Rule-Based Care Navigation Engine
Provides transparent, deterministic healthcare navigation rather than medical diagnosis.
Prioritizes emergency safety red flags, matches care pathways, and details reasoning.
"""

from db import (
    get_symptom_by_slug,
    get_care_rules,
    get_emergency_flags,
    get_specialty_by_slug
)

SEVERITY_LEVELS = {
    "mild": 1,
    "moderate": 2,
    "severe": 3
}

DURATION_LEVELS = {
    "hours": 1,
    "days_1_3": 2,
    "days_4_7": 3,
    "weeks_1_2": 4,
    "chronic": 5
}

SEVERITY_LABELS = {
    "mild": "Mild (Manageable, minor discomfort)",
    "moderate": "Moderate (Noticeable, interferes with daily tasks)",
    "severe": "Severe (Intense, debilitating or alarming)"
}

DURATION_LABELS = {
    "hours": "Less than 24 hours (Sudden / Recent onset)",
    "days_1_3": "1 to 3 days (Short-term)",
    "days_4_7": "4 to 7 days (Ongoing)",
    "weeks_1_2": "1 to 2 weeks (Persistent / Subacute)",
    "chronic": "More than 2 weeks (Chronic / Recurring)"
}


def evaluate_symptoms(primary_symptom_slug, secondary_symptom_slugs=None, severity="moderate", duration="days_1_3", red_flags_checked=None, age_group="adult"):
    """
    Evaluates symptoms and returns transparent medical specialty guidance,
    triage categorization, reasoning chain, and emergency action plan.
    """
    secondary_symptom_slugs = secondary_symptom_slugs or []
    red_flags_checked = red_flags_checked or []
    
    explanation_steps = []
    detected_red_flags = []
    
    primary_symptom = get_symptom_by_slug(primary_symptom_slug)
    if not primary_symptom:
        return {
            "error": "Primary symptom not found.",
            "status": "invalid_input"
        }

    explanation_steps.append({
        "phase": "Input Review",
        "detail": f"Evaluated primary symptom '{primary_symptom['name']}' with {SEVERITY_LABELS.get(severity, severity)} severity over {DURATION_LABELS.get(duration, duration)} duration."
    })

    if secondary_symptom_slugs:
        sec_names = []
        for s_slug in secondary_symptom_slugs:
            s_obj = get_symptom_by_slug(s_slug)
            if s_obj:
                sec_names.append(s_obj["name"])
        if sec_names:
            explanation_steps.append({
                "phase": "Associated Symptoms",
                "detail": f"Considered co-occurring symptoms: {', '.join(sec_names)}."
            })

    # ------------------ 1. Emergency Safety Checks ------------------
    all_red_flags = get_emergency_flags()
    red_flags_map = {rf["slug"]: rf for rf in all_red_flags}

    # Check explicitly marked red flag checkboxes
    for rf_slug in red_flags_checked:
        if rf_slug in red_flags_map:
            detected_red_flags.append(red_flags_map[rf_slug])

    # Check if primary symptom itself has emergency flag
    if primary_symptom.get("is_emergency_flag"):
        detected_red_flags.append({
            "slug": primary_symptom["slug"],
            "title": primary_symptom["name"],
            "description": primary_symptom.get("emergency_warning_text") or "Critical warning sign detected.",
            "immediate_action": "Seek immediate emergency department triage or call 911 / 112 without delay.",
            "risk_level": "critical"
        })

    # Check secondary symptoms for emergency flags
    for s_slug in secondary_symptom_slugs:
        sec_sym = get_symptom_by_slug(s_slug)
        if sec_sym and sec_sym.get("is_emergency_flag"):
            detected_red_flags.append({
                "slug": sec_sym["slug"],
                "title": sec_sym["name"],
                "description": sec_sym.get("emergency_warning_text") or "Emergency warning flag identified.",
                "immediate_action": "Requires prompt emergency medical evaluation.",
                "risk_level": "critical"
            })

    # Severe chest pain, dyspnea, or severe headache override
    if severity == "severe":
        if primary_symptom["body_part_slug"] in ["chest", "head"] and primary_symptom_slug in ["chest_pain_crushing", "shortness_of_breath_severe", "headache_thunderclap"]:
            if not any(rf["slug"] == primary_symptom_slug for rf in detected_red_flags):
                detected_red_flags.append({
                    "slug": "severe_urgent_flag",
                    "title": f"Severe Intensity in {primary_symptom['name']}",
                    "description": "High-intensity acute symptoms in the chest or cranium require immediate rule-out of vascular, cardiac, or cerebral crises.",
                    "immediate_action": "Call local emergency medical services or go to the nearest emergency center immediately.",
                    "risk_level": "critical"
                })

    # If Red Flags detected -> EMERGENCY Triage
    if detected_red_flags:
        explanation_steps.append({
            "phase": "Safety Red Flag Triggered",
            "detail": f"One or more critical emergency warning signs were identified ({', '.join([rf['title'] for rf in detected_red_flags])}). Standard outpatient consultation is superseded by urgent emergency care."
        })
        
        emergency_specialty = get_specialty_by_slug(primary_symptom.get("default_specialty_slug") or "general_physician")

        return {
            "triage_level": "EMERGENCY",
            "triage_badge": {
                "label": "EMERGENCY CARE NEEDED IMMEDIATELY",
                "color": "danger",
                "icon": "alarm-exclamation"
            },
            "primary_symptom": primary_symptom,
            "emergency_flags": detected_red_flags,
            "recommended_specialty": {
                "slug": "emergency_medicine",
                "name": "Emergency Department / Casualty Medical Officer",
                "icon": "truck-medical",
                "category": "Immediate Emergency Medicine",
                "description": "Hospital emergency department equipped with rapid resuscitation, continuous monitoring, emergency ECG, CT imaging, and emergency physicians.",
                "what_they_do": "Stabilizes vital signs, rules out life-threatening conditions (acute infarction, pulmonary embolism, stroke, internal hemorrhage), and initiates urgent therapy.",
                "typical_evaluations": "Stat 12-lead ECG, troponin, bedside ultrasound (POCUS), venous blood gas, continuous cardiac telemetry, and immediate specialist on-call consult.",
                "questions_to_ask": "Is the patient stabilized? Has an acute cardiac, vascular, or neurological event been ruled out?"
            },
            "secondary_specialty": emergency_specialty,
            "reasoning_steps": explanation_steps,
            "immediate_guidance": "DO NOT wait for an outpatient clinic appointment. Call emergency services (911 in US, 112 in EU/India, 102/108 in India, 999 in UK) or proceed directly to the nearest emergency room. Do not drive yourself.",
            "preparation_checklist": [
                "Stay seated or resting quietly; loosen tight clothing around the neck and chest.",
                "If alone, unlock your front door and inform a family member, neighbor, or companion.",
                "Have your current medication bottles, identification, and health insurance card ready for responders.",
                "Do not eat, drink, or take unprescribed painkillers until evaluated by emergency medical staff."
            ],
            "limitations_disclaimer": "CRITICAL NOTICE: MediGuide is an educational care-navigation tool and does NOT provide diagnosis. For symptoms involving severe pain, sudden weakness, breathing distress, or loss of consciousness, seek professional emergency medical attention immediately."
        }

    # ------------------ 2. Rule Matching Engine ------------------
    rules = get_care_rules()
    user_sev_val = SEVERITY_LEVELS.get(severity, 2)
    user_dur_val = DURATION_LEVELS.get(duration, 2)

    matched_rule = None
    for rule in rules:
        if rule["primary_symptom_slug"] == primary_symptom_slug:
            # Check secondary symptom if specified in rule
            if rule.get("secondary_symptom_slug"):
                if rule["secondary_symptom_slug"] not in secondary_symptom_slugs:
                    continue

            rule_sev_val = SEVERITY_LEVELS.get(rule["min_severity"], 1)
            rule_dur_val = DURATION_LEVELS.get(rule["min_duration"], 1)

            if user_sev_val >= rule_sev_val and user_dur_val >= rule_dur_val:
                matched_rule = rule
                break

    # ------------------ 3. Determine Guidance & Specialties ------------------
    if matched_rule:
        triage_level = matched_rule["triage_level"]
        rec_specialty_slug = matched_rule["recommended_specialty_slug"]
        sec_specialty_slug = matched_rule.get("secondary_specialty_slug") or "general_physician"
        explanation_steps.append({
            "phase": "Care Rule Matched",
            "detail": f"Matched clinical navigation rule: '{matched_rule['rule_name']}'. {matched_rule['explanation']}"
        })
    else:
        # Fallback heuristic based on duration & severity
        if severity == "mild" and user_dur_val <= 2:
            triage_level = "PRIMARY_CARE"
            rec_specialty_slug = "general_physician"
            sec_specialty_slug = primary_symptom.get("default_specialty_slug") or "general_physician"
            explanation_steps.append({
                "phase": "Conservative Triage",
                "detail": "Given the mild intensity and short timeframe (< 3 days), a General Physician / Family Doctor is the most suitable starting point to conduct an initial physical assessment and rule out common benign causes."
            })
        else:
            triage_level = "SPECIALIST_CONSULT"
            rec_specialty_slug = primary_symptom.get("default_specialty_slug") or "general_physician"
            sec_specialty_slug = "general_physician"
            explanation_steps.append({
                "phase": "Targeted Specialist Navigation",
                "detail": f"Based on persistent or moderate symptoms located in the {primary_symptom['body_part_slug']} region, a direct evaluation by a {rec_specialty_slug.replace('_', ' ').title()} is recommended."
            })

    primary_specialty = get_specialty_by_slug(rec_specialty_slug) or get_specialty_by_slug("general_physician")
    secondary_specialty = get_specialty_by_slug(sec_specialty_slug)

    # Triage badge configuration
    triage_badges = {
        "EMERGENCY": {
            "label": "EMERGENCY CARE REQUIRED",
            "color": "danger",
            "icon": "shield-alert"
        },
        "URGENT_SPECIALIST": {
            "label": "PROMPT SPECIALIST CONSULTATION (Within 24–48 Hours)",
            "color": "warning",
            "icon": "clock"
        },
        "SPECIALIST_CONSULT": {
            "label": "SPECIALIST EVALUATION RECOMMENDED",
            "color": "primary",
            "icon": "user-check"
        },
        "PRIMARY_CARE": {
            "label": "GENERAL PHYSICIAN / PRIMARY CARE FIRST",
            "color": "success",
            "icon": "stethoscope"
        },
        "SELF_CARE_MONITOR": {
            "label": "HOME MONITORING & PRIMARY CARE CONSULT",
            "color": "info",
            "icon": "heart-handshake"
        }
    }

    # Questions & Preparation Checklist
    prep_checklist = [
        "Write down a brief timeline: note the exact date/hour symptoms started, whether they are continuous or intermittent.",
        "List all prescription drugs, over-the-counter supplements, or herbal remedies you are currently taking.",
        "Note any aggravating triggers (e.g. eating, bending, exercise) or alleviating factors (rest, cold compresses).",
        "Bring previous blood reports, discharge summaries, or imaging films related to this problem.",
        f"Ask your doctor: '{primary_specialty.get('questions_to_ask', 'What are the most likely causes and recommended next steps?')}'"
    ]

    return {
        "triage_level": triage_level,
        "triage_badge": triage_badges.get(triage_level, triage_badges["SPECIALIST_CONSULT"]),
        "primary_symptom": primary_symptom,
        "emergency_flags": [],
        "recommended_specialty": primary_specialty,
        "secondary_specialty": secondary_specialty,
        "reasoning_steps": explanation_steps,
        "preparation_checklist": prep_checklist,
        "limitations_disclaimer": "IMPORTANT HEALTHCARE NOTICE: MediGuide provides care-navigation guidance to help you identify suitable medical disciplines. It does not provide medical diagnoses, treatment prescriptions, or doctor-patient relationships. Always consult a qualified physician for clinical evaluation."
    }
