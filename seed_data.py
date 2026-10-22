"""
Comprehensive Seed Data for MediGuide
Provides initial dataset for Specialties, Body Parts, Symptoms, Emergency Red Flags,
Care Guidance Rules, and Doctors.
"""

SPECIALTIES = [
    {
        "slug": "general_physician",
        "name": "General Physician / Family Doctor",
        "icon": "stethoscope",
        "category": "Primary Care",
        "description": "Primary healthcare doctors who diagnose and treat a wide range of common acute and chronic illnesses, provide routine health checks, and coordinate care with specialists.",
        "what_they_do": "Performs comprehensive physical examinations, reviews full medical history, orders baseline blood and imaging tests, manages non-specialized conditions, and refers patients to focused specialists when advanced care is needed.",
        "typical_evaluations": "Complete blood count (CBC), vitals check (BP, SpO2, heart rate, temperature), urine analysis, basic metabolic panel, and initial physical diagnostic exam.",
        "questions_to_ask": "What could be causing these symptoms? Are there lifestyle changes or over-the-counter remedies I should start with? Under what signs should I consult a specialist or return?"
    },
    {
        "slug": "cardiologist",
        "name": "Cardiologist",
        "icon": "heart-pulse",
        "category": "Heart & Vascular",
        "description": "Specialists focusing on disorders of the heart, blood vessels, and cardiovascular circulation.",
        "what_they_do": "Evaluates heart rhythm, coronary artery health, valve function, and blood pressure regulation to prevent or treat cardiac emergencies, arrhythmias, and heart disease.",
        "typical_evaluations": "12-lead Electrocardiogram (ECG/EKG), Echocardiogram (2D Echo), Cardiac enzymes (Troponin), Treadmill Stress Test (TMT), and Holter ambulatory monitoring.",
        "questions_to_ask": "Is my chest discomfort cardiac or non-cardiac in origin? Do I need an ECG or stress test? Are my blood pressure and cholesterol levels in safe ranges?"
    },
    {
        "slug": "pulmonologist",
        "name": "Pulmonologist / Chest Physician",
        "icon": "lungs",
        "category": "Respiratory",
        "description": "Specialists in lung diseases, respiratory system disorders, bronchial infections, and chronic airway inflammation.",
        "what_they_do": "Diagnoses asthma, chronic bronchitis, pneumonia, COPD, sleep apnea, pulmonary fibrosis, and persistent unresolving cough or shortness of breath.",
        "typical_evaluations": "Spirometry / Pulmonary Function Test (PFT), Chest X-ray, High-Resolution CT scan (HRCT) of thorax, fractional exhaled nitric oxide (FeNO), and arterial blood gas analysis.",
        "questions_to_ask": "Could this be asthma, an allergy, or a respiratory infection? What inhalers or pulmonary treatments are recommended? Is my oxygen saturation level stable?"
    },
    {
        "slug": "neurologist",
        "name": "Neurologist",
        "icon": "brain",
        "category": "Brain & Nervous System",
        "description": "Specialists diagnosing and treating disorders of the central and peripheral nervous system, including the brain, spinal cord, and nerves.",
        "what_they_do": "Evaluates chronic or severe headaches, migraines, nerve pain, seizures, tremors, memory issues, numbness, balance disorders, and dizziness.",
        "typical_evaluations": "Neurological reflex examination, Brain MRI/CT scan, Electroencephalogram (EEG), Nerve Conduction Studies (NCS/EMG), and carotid Doppler ultrasound.",
        "questions_to_ask": "What is the trigger for my severe headaches or numbness? Are neuro-imaging tests like an MRI indicated? How can we prevent migraine recurrence?"
    },
    {
        "slug": "gastroenterologist",
        "name": "Gastroenterologist",
        "icon": "stomach",
        "category": "Digestive System",
        "description": "Specialists managing diseases of the gastrointestinal tract, including the esophagus, stomach, intestines, liver, gallbladder, and pancreas.",
        "what_they_do": "Investigates persistent abdominal pain, severe acid reflux/GERD, irritable bowel symptoms, chronic diarrhea or constipation, jaundice, and unexplained weight loss.",
        "typical_evaluations": "Upper GI Endoscopy (EGD), Colonoscopy, Abdominal Ultrasound/CT, Liver Function Tests (LFT), H. pylori test, and stool analysis.",
        "questions_to_ask": "Could my stomach pain be gastritis, ulcer, or gallbladder-related? Do I require an ultrasound or endoscopy? What dietary triggers should I avoid?"
    },
    {
        "slug": "dermatologist",
        "name": "Dermatologist",
        "icon": "sparkles",
        "category": "Skin & Hair",
        "description": "Medical experts dedicated to diagnosing and treating diseases of the skin, hair, nails, and mucous membranes.",
        "what_they_do": "Treats stubborn rashes, eczema, psoriasis, severe acne, fungal and bacterial infections, suspicious moles, allergic contact dermatitis, and hives.",
        "typical_evaluations": "Dermoscopy examination, skin biopsy or scraping, fungal KOH mount, patch testing for allergens, and blood allergy profiling.",
        "questions_to_ask": "What type of dermatitis or infection is this rash? Is it contagious or allergic? Which topical creams or medications will control flare-ups safely?"
    },
    {
        "slug": "orthopedist",
        "name": "Orthopedic Surgeon / Specialist",
        "icon": "bone",
        "category": "Bones & Joints",
        "description": "Specialists focusing on the musculoskeletal system, including bones, joints, ligaments, tendons, and muscles.",
        "what_they_do": "Manages joint pain, back and neck pain, sports injuries, ligament tears, fractures, osteoarthritis, spine degeneration, and carpal tunnel syndrome.",
        "typical_evaluations": "X-rays of affected joints/bones, MRI of joints/spine, physical mobility and joint stress testing, and joint fluid aspiration if effusion is present.",
        "questions_to_ask": "Is my joint pain caused by wear and tear (arthritis) or a ligament injury? Do I need physical therapy or imaging? Are there non-surgical interventions available?"
    },
    {
        "slug": "ent_specialist",
        "name": "ENT Specialist (Otolaryngologist)",
        "icon": "headset",
        "category": "Ear, Nose & Throat",
        "description": "Specialists diagnosing conditions affecting the ears, hearing, balance, nasal passages, sinuses, tonsils, vocal cords, and throat.",
        "what_they_do": "Treats earaches, tinnitus, vertigo, hearing loss, chronic sinusitis, tonsillitis, persistent hoarseness, swallowing difficulties, and nasal obstruction.",
        "typical_evaluations": "Otoscopy (ear examination), Nasal endoscopy, Pure Tone Audiometry (hearing test), Tympanometry, and Sinus CT scan.",
        "questions_to_ask": "Is my ear pain related to an infection or fluid buildup? Could my dizziness be inner-ear vertigo? Is my sinus congestion bacterial or allergic?"
    },
    {
        "slug": "ophthalmologist",
        "name": "Ophthalmologist / Eye Specialist",
        "icon": "eye",
        "category": "Vision & Eyes",
        "description": "Medical doctors specializing in eye care, vision health, and ophthalmic microsurgery.",
        "what_they_do": "Diagnoses acute eye redness, severe eye pain, vision changes, floaters/flashes, cataracts, glaucoma, cornea infections, and dry eye syndromes.",
        "typical_evaluations": "Slit-lamp biomicroscopy, intraocular pressure tonometry, dilated fundus/retinal examination, visual acuity testing, and optical coherence tomography (OCT).",
        "questions_to_ask": "Is my eye redness an infectious conjunctivitis or cornea inflammation? Is my intraocular pressure normal? Are there signs of retinal issues?"
    },
    {
        "slug": "psychiatrist",
        "name": "Psychiatrist / Mental Health Specialist",
        "icon": "smile",
        "category": "Mental & Emotional Health",
        "description": "Physicians specializing in mental health, emotional wellness, mood disorders, and psychological well-being.",
        "what_they_do": "Evaluates severe anxiety, panic attacks, clinical depression, insomnia, obsessive thoughts, chronic stress burnout, and mood fluctuations.",
        "typical_evaluations": "Clinical diagnostic psychological assessment, psychiatric evaluation scales (PHQ-9, GAD-7), and screening for organic physical contributors (thyroid, B12).",
        "questions_to_ask": "How can we differentiate between physical stress and an anxiety disorder? Would talk therapy, medication, or both benefit my condition?"
    },
    {
        "slug": "urologist",
        "name": "Urologist",
        "icon": "droplet",
        "category": "Urinary & Reproductive",
        "description": "Specialists focusing on the urinary tract system in men and women, and the male reproductive organs.",
        "what_they_do": "Manages kidney stones, recurrent urinary tract infections (UTIs), painful urination, blood in urine, prostate issues, and urinary incontinence.",
        "typical_evaluations": "Urinalysis and urine culture, Ultrasound KUB (Kidney, Ureter, Bladder), CT Urogram, Serum PSA test, and uroflowmetry.",
        "questions_to_ask": "Is my flank pain indicative of a kidney stone? Do I need an ultrasound or antibiotic course? What measures can prevent recurrence?"
    },
    {
        "slug": "rheumatologist",
        "name": "Rheumatologist",
        "icon": "shield-plus",
        "category": "Autoimmune & Joints",
        "description": "Specialists in autoimmune diseases, systemic inflammatory conditions, and chronic multi-joint arthritis.",
        "what_they_do": "Investigates chronic symmetrical joint swelling, morning stiffness lasting > 1 hour, rheumatoid arthritis, lupus, gout, and systemic inflammation.",
        "typical_evaluations": "Rheumatoid Factor (RF), Anti-CCP, ANA profile, ESR, C-reactive protein (CRP), and Serum Uric Acid test.",
        "questions_to_ask": "Could my joint inflammation be autoimmune? What blood markers will clarify this? How can early intervention protect my joint health?"
    },
    {
        "slug": "endocrinologist",
        "name": "Endocrinologist",
        "icon": "activity",
        "category": "Hormones & Metabolism",
        "description": "Specialists who treat hormone imbalances, thyroid conditions, metabolic disorders, and diabetes.",
        "what_they_do": "Manages unexplained rapid weight changes, chronic exhaustion, extreme thirst/frequent urination, thyroid nodules, PCOS, and adrenal imbalances.",
        "typical_evaluations": "Thyroid panel (TSH, Free T3, Free T4), HbA1c, Fasting Blood Glucose, Serum Cortisol, and hormone ultrasound.",
        "questions_to_ask": "Are my energy levels and weight issues linked to thyroid or hormonal dysfunction? Which hormone panel should we run?"
    }
]

BODY_PARTS = [
    {
        "slug": "head",
        "name": "Head & Brain",
        "view_type": "both",
        "description": "Cranium, forehead, temples, scalp, and central nervous system.",
        "svg_element_id": "part-head",
        "display_order": 1
    },
    {
        "slug": "eyes",
        "name": "Eyes & Vision",
        "view_type": "front",
        "description": "Ocular region, eyesight, eyelids, and visual perception.",
        "svg_element_id": "part-eyes",
        "display_order": 2
    },
    {
        "slug": "ent",
        "name": "Ears, Nose & Throat",
        "view_type": "front",
        "description": "Ears, hearing, sinuses, nasal cavity, tonsils, and throat.",
        "svg_element_id": "part-ent",
        "display_order": 3
    },
    {
        "slug": "neck",
        "name": "Neck & Cervical Spine",
        "view_type": "both",
        "description": "Cervical spine, thyroid area, neck muscles, and lymph nodes.",
        "svg_element_id": "part-neck",
        "display_order": 4
    },
    {
        "slug": "chest",
        "name": "Chest & Heart/Lungs",
        "view_type": "front",
        "description": "Thoracic cage, heart, lungs, bronchi, and ribs.",
        "svg_element_id": "part-chest",
        "display_order": 5
    },
    {
        "slug": "abdomen",
        "name": "Abdomen & Digestion",
        "view_type": "front",
        "description": "Stomach, liver, gallbladder, intestines, and pelvic abdomen.",
        "svg_element_id": "part-abdomen",
        "display_order": 6
    },
    {
        "slug": "back",
        "name": "Back & Spine",
        "view_type": "back",
        "description": "Upper back, shoulder blades, mid-back, and lumbar/lower back.",
        "svg_element_id": "part-back",
        "display_order": 7
    },
    {
        "slug": "joints",
        "name": "Joints, Bones & Limbs",
        "view_type": "both",
        "description": "Shoulders, elbows, wrists, hips, knees, ankles, and bones.",
        "svg_element_id": "part-joints",
        "display_order": 8
    },
    {
        "slug": "skin",
        "name": "Skin & Cutaneous",
        "view_type": "both",
        "description": "Body surface, dermis, rashes, lesions, itching, and hives.",
        "svg_element_id": "part-skin",
        "display_order": 9
    },
    {
        "slug": "general",
        "name": "General & Whole Body",
        "view_type": "both",
        "description": "Systemic symptoms such as fever, fatigue, chills, body aches, and weakness.",
        "svg_element_id": "part-general",
        "display_order": 10
    }
]

SYMPTOMS = [
    # Head & Brain
    {
        "slug": "headache_throbbing",
        "name": "Throbbing or One-Sided Headache",
        "body_part_slug": "head",
        "default_specialty_slug": "neurologist",
        "description": "Pulsating pain often on one side of the head, sensitivity to light/sound, or nausea.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Stress, lack of sleep, hormonal changes, bright lights"
    },
    {
        "slug": "headache_thunderclap",
        "name": "Sudden 'Worst Headache of Life' (Thunderclap)",
        "body_part_slug": "head",
        "default_specialty_slug": "neurologist",
        "description": "Extremely intense, explosive headache peaking within seconds.",
        "is_emergency_flag": True,
        "emergency_warning_text": "Emergency! Sudden thunderclap headache can indicate intracranial hemorrhage or aneurysmal rupture.",
        "typical_severity": "severe",
        "common_triggers": "Sudden onset without warning"
    },
    {
        "slug": "facial_droop_speech",
        "name": "Facial Drooping, Arm Weakness, or Slurred Speech (FAST)",
        "body_part_slug": "head",
        "default_specialty_slug": "neurologist",
        "description": "Sudden asymmetric facial weakness, unable to lift one arm, or difficulty speaking clearly.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Classic signs of Acute Stroke. Call 911 / 112 / 102 immediately! Time is brain tissue.",
        "typical_severity": "severe",
        "common_triggers": "Vascular event"
    },
    {
        "slug": "dizziness_vertigo",
        "name": "Dizziness / Room Spinning (Vertigo)",
        "body_part_slug": "head",
        "default_specialty_slug": "ent_specialist",
        "description": "Illusion of movement, feeling like the room or world is spinning around you.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Head movement, inner ear fluid shift, vestibular imbalance"
    },
    
    # Eyes & Vision
    {
        "slug": "eye_redness_discharge",
        "name": "Eye Redness, Grittiness & Discharge (Pink Eye)",
        "body_part_slug": "eyes",
        "default_specialty_slug": "ophthalmologist",
        "description": "Red conjunctiva, sticky yellow/green or watery discharge, itching or foreign-body sensation.",
        "is_emergency_flag": False,
        "typical_severity": "mild",
        "common_triggers": "Viral/bacterial contact, contact lenses, allergens"
    },
    {
        "slug": "vision_sudden_loss",
        "name": "Sudden Vision Loss or Flashes of Light",
        "body_part_slug": "eyes",
        "default_specialty_slug": "ophthalmologist",
        "description": "Sudden blurriness, darkness across visual field, or showering flashes and black specks.",
        "is_emergency_flag": True,
        "emergency_warning_text": "EMERGENCY! Sudden loss of sight or retinal curtain effect requires immediate emergency eye evaluation.",
        "typical_severity": "severe",
        "common_triggers": "Retinal detachment, vascular occlusion, acute glaucoma"
    },
    {
        "slug": "eye_pain_severe",
        "name": "Severe Deep Eye Pain with Halos Around Lights",
        "body_part_slug": "eyes",
        "default_specialty_slug": "ophthalmologist",
        "description": "Intense aching in or behind the eyeball, seeing rainbow halos around lights, accompanied by nausea.",
        "is_emergency_flag": True,
        "emergency_warning_text": "URGENT RED FLAG: Possible acute angle-closure glaucoma or severe keratitis.",
        "typical_severity": "severe",
        "common_triggers": "Pupillary dilation in dim light, anatomical predisposition"
    },
    
    # ENT
    {
        "slug": "sore_throat_fever",
        "name": "Sore Throat with Pain on Swallowing",
        "body_part_slug": "ent",
        "default_specialty_slug": "general_physician",
        "description": "Scratchy, painful sensation in the throat, swollen tonsils, or painful swallowing.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Viral pharyngitis, strep bacteria, seasonal change"
    },
    {
        "slug": "ear_pain_discharge",
        "name": "Ear Pain, Blockage or Ringing (Tinnitus)",
        "body_part_slug": "ent",
        "default_specialty_slug": "ent_specialist",
        "description": "Sharp or dull ache inside the ear canal, muffled hearing, or ringing sounds.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Swimming, middle ear infection, wax impaction"
    },
    {
        "slug": "nasal_congestion_sinus_pressure",
        "name": "Sinus Pressure, Facial Pain & Congestion",
        "body_part_slug": "ent",
        "default_specialty_slug": "ent_specialist",
        "description": "Heavy pressure behind cheekbones, forehead, and bridge of nose with nasal blockage.",
        "is_emergency_flag": False,
        "typical_severity": "mild",
        "common_triggers": "Cold aftermath, allergies, temperature shifts"
    },
    
    # Chest & Heart/Lungs
    {
        "slug": "chest_pain_crushing",
        "name": "Severe Crushing Chest Pressure / Radiating to Left Arm or Jaw",
        "body_part_slug": "chest",
        "default_specialty_slug": "cardiologist",
        "description": "Squeezing, heavy tightness or aching in center of chest that may spread to left shoulder, arm, jaw, or back.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Classic sign of Acute Myocardial Infarction (Heart Attack). Call Emergency 911 / 112 immediately!",
        "typical_severity": "severe",
        "common_triggers": "Exertion, emotional stress, or spontaneous"
    },
    {
        "slug": "shortness_of_breath_severe",
        "name": "Severe Difficulty Breathing / Gasping for Air at Rest",
        "body_part_slug": "chest",
        "default_specialty_slug": "pulmonologist",
        "description": "Struggling to draw breath while sitting quietly, blue tint on lips, or inability to speak in sentences.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Acute respiratory failure, pulmonary embolism, or acute asthma exacerbation.",
        "typical_severity": "severe",
        "common_triggers": "Sudden onset, respiratory distress"
    },
    {
        "slug": "persistent_cough_wheezing",
        "name": "Persistent Cough with Wheezing or Phlegm",
        "body_part_slug": "chest",
        "default_specialty_slug": "pulmonologist",
        "description": "Cough lasting over 2 weeks, whistling sounds when exhaling, or production of thick mucus.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Air pollution, post-viral airway hyperresponsiveness, asthma"
    },
    {
        "slug": "heart_palpitations",
        "name": "Heart Palpitations / Racing or Skipping Heartbeats",
        "body_part_slug": "chest",
        "default_specialty_slug": "cardiologist",
        "description": "Sensation of heart fluttering, pounding forcefully, or skipping beats while resting.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Caffeine, stress, dehydration, electrolyte imbalance"
    },
    {
        "slug": "burning_chest_reflux",
        "name": "Burning Sensation Behind Breastbone (Heartburn / Acid Reflux)",
        "body_part_slug": "chest",
        "default_specialty_slug": "gastroenterologist",
        "description": "Burning ache rising from upper abdomen into the chest, often worse after heavy or spicy meals and lying down.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Spicy/fatty foods, coffee, lying down right after meals"
    },
    
    # Abdomen & Digestion
    {
        "slug": "severe_rigid_abdominal_pain",
        "name": "Sudden Severe Abdominal Pain with Rigid Hard Belly",
        "body_part_slug": "abdomen",
        "default_specialty_slug": "gastroenterologist",
        "description": "Intense unbearable abdominal cramps, hard board-like stomach, vomiting, inability to pass gas or stand straight.",
        "is_emergency_flag": True,
        "emergency_warning_text": "EMERGENCY! Suspected acute appendicitis, bowel perforation, or acute pancreatitis. Needs urgent ER evaluation.",
        "typical_severity": "severe",
        "common_triggers": "Acute surgical abdomen"
    },
    {
        "slug": "vomiting_blood_black_stools",
        "name": "Vomiting Blood or Passing Dark Tar-Like Black Stools",
        "body_part_slug": "abdomen",
        "default_specialty_slug": "gastroenterologist",
        "description": "Throwing up dark brown 'coffee ground' material or bright red blood, or foul tarry stools.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Active Gastrointestinal Bleeding. Seek immediate emergency department admission.",
        "typical_severity": "severe",
        "common_triggers": "Bleeding peptic ulcer, esophageal varices"
    },
    {
        "slug": "cramping_bloating_diarrhea",
        "name": "Abdominal Cramping, Bloating & Watery Diarrhea",
        "body_part_slug": "abdomen",
        "default_specialty_slug": "general_physician",
        "description": "Loose frequent stools, gas, stomach gurgling, and mild nausea lasting 1-3 days.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Food intolerance, contaminated meal, viral gastroenteritis"
    },
    {
        "slug": "yellowing_skin_jaundice",
        "name": "Yellowing of Eyes/Skin (Jaundice) & Dark Urine",
        "body_part_slug": "abdomen",
        "default_specialty_slug": "gastroenterologist",
        "description": "Yellowish tint in whites of eyes and skin, pale stools, tea-colored urine, and upper right abdominal ache.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Hepatitis, bile duct stone, liver dysfunction"
    },
    
    # Back & Spine
    {
        "slug": "lower_back_pain_muscle",
        "name": "Lower Back Aching or Muscle Spasm",
        "body_part_slug": "back",
        "default_specialty_slug": "orthopedist",
        "description": "Stiffness, dull ache, or tight spasms across the lumbar region aggravated by bending or prolonged sitting.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Heavy lifting, poor posture, sedentary desk work"
    },
    {
        "slug": "back_pain_numbness_bladder",
        "name": "Severe Back Pain with Leg Numbness & Loss of Bladder/Bowel Control",
        "body_part_slug": "back",
        "default_specialty_slug": "neurologist",
        "description": "Shooting sciatica pain combined with saddle numbness around groin and inability to hold urine or bowel movements.",
        "is_emergency_flag": True,
        "emergency_warning_text": "SURGICAL EMERGENCY! Cauda Equina Syndrome. Requires immediate emergency decompression to avoid permanent nerve damage.",
        "typical_severity": "severe",
        "common_triggers": "Massive disc herniation"
    },
    {
        "slug": "shooting_leg_pain_sciatica",
        "name": "Shooting Nerve Pain Down One Leg (Sciatica)",
        "body_part_slug": "back",
        "default_specialty_slug": "orthopedist",
        "description": "Electric shock or burning sensation traveling from the lower back through buttock down past the knee.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Lumbar nerve root compression, disc bulge"
    },
    
    # Joints, Bones & Limbs
    {
        "slug": "knee_joint_swelling_pain",
        "name": "Knee / Joint Pain with Stiffness & Swelling",
        "body_part_slug": "joints",
        "default_specialty_slug": "orthopedist",
        "description": "Aching pain when walking or climbing stairs, joint clicking, warmth, or mild swelling.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Cartilage wear, sports twist, repetitive strain"
    },
    {
        "slug": "symmetric_joint_morning_stiffness",
        "name": "Symmetric Joint Pain & Morning Stiffness > 1 Hour",
        "body_part_slug": "joints",
        "default_specialty_slug": "rheumatologist",
        "description": "Pain and swelling in finger knuckles and wrists on both hands, feeling rigid for over an hour after waking.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Autoimmune joint inflammation, Rheumatoid arthritis"
    },
    {
        "slug": "sudden_swollen_hot_big_toe",
        "name": "Excruciating Hot, Red, Swollen Big Toe Joint (Gout)",
        "body_part_slug": "joints",
        "default_specialty_slug": "rheumatologist",
        "description": "Sudden onset of severe fiery throbbing pain at base of big toe, impossible to bear weight or touch sheets.",
        "is_emergency_flag": False,
        "typical_severity": "severe",
        "common_triggers": "High purine diet, alcohol, dehydration, elevated uric acid"
    },
    
    # Skin
    {
        "slug": "itchy_rash_eczema",
        "name": "Dry, Red, Scaling or Itchy Skin Patches",
        "body_part_slug": "skin",
        "default_specialty_slug": "dermatologist",
        "description": "Inflamed skin patches, intense pruritus (itching), flaky scales, or cracked surface.",
        "is_emergency_flag": False,
        "typical_severity": "mild",
        "common_triggers": "Dry weather, harsh detergents, contact irritants, stress"
    },
    {
        "slug": "anaphylaxis_hives_lip_swelling",
        "name": "Rapid Spreading Hives with Swelling of Lips, Tongue or Throat",
        "body_part_slug": "skin",
        "default_specialty_slug": "general_physician",
        "description": "Rapidly erupting welts accompanied by swollen lips/tongue, wheezing, and tight throat.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Anaphylactic Allergic Shock. Use Epinephrine auto-injector if prescribed and call Emergency 911 / 112 immediately!",
        "typical_severity": "severe",
        "common_triggers": "Food allergy (peanuts, shellfish), insect sting, medication reaction"
    },
    {
        "slug": "unusual_changing_mole",
        "name": "Irregular, Changing or Bleeding Skin Mole (ABCDE)",
        "body_part_slug": "skin",
        "default_specialty_slug": "dermatologist",
        "description": "Mole showing asymmetry, uneven borders, multiple colors, diameter > 6mm, or evolving over time.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Sun exposure, atypical dysplastic nevus"
    },
    
    # General & Whole Body
    {
        "slug": "fever_mild_body_aches",
        "name": "Fever with Generalized Body Aches & Chills",
        "body_part_slug": "general",
        "default_specialty_slug": "general_physician",
        "description": "Body temperature between 99.5°F - 102°F, shivering, muscle soreness, and feeling run down.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Viral flu, viral fever, common viral infection"
    },
    {
        "slug": "fever_stiff_neck_confusion",
        "name": "High Fever with Stiff Neck, Confusion or Extreme Lethargy",
        "body_part_slug": "general",
        "default_specialty_slug": "neurologist",
        "description": "Temperature over 103°F, unable to touch chin to chest, altered mental status, delirium, or photophobia.",
        "is_emergency_flag": True,
        "emergency_warning_text": "CRITICAL EMERGENCY! Suspected Acute Meningitis or Encephalitis. Immediate hospital emergency room admission is essential.",
        "typical_severity": "severe",
        "common_triggers": "Central nervous system infection"
    },
    {
        "slug": "chronic_fatigue_weight_loss",
        "name": "Unexplained Significant Weight Loss & Profound Exhaustion",
        "body_part_slug": "general",
        "default_specialty_slug": "general_physician",
        "description": "Losing 5-10% body weight without dieting, constant low energy lasting over 3 weeks.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Metabolic, thyroid, endocrine, or systemic causes"
    },
    {
        "slug": "frequent_painful_urination",
        "name": "Painful, Burning Urination with Lower Pelvic Aching",
        "body_part_slug": "general",
        "default_specialty_slug": "general_physician",
        "description": "Stinging sensation during urination, persistent urge to void small volumes, or cloudy urine.",
        "is_emergency_flag": False,
        "typical_severity": "moderate",
        "common_triggers": "Urinary Tract Infection (UTI), bladder irritation"
    }
]

EMERGENCY_RED_FLAGS = [
    {
        "slug": "cardiac_arrest_signs",
        "title": "Severe Crushing Chest Pain or Pressure",
        "description": "Chest discomfort lasting more than 5 minutes, feeling like heavy squeezing radiating to arm, shoulder, jaw or back, accompanied by cold sweat or dizziness.",
        "body_part_slug": "chest",
        "symptom_slug": "chest_pain_crushing",
        "immediate_action": "Call 911 / 112 immediately. Chew an aspirin (if not allergic) and do not attempt to drive.",
        "risk_level": "critical"
    },
    {
        "slug": "acute_stroke_fast",
        "title": "Sudden Stroke Signs (FAST)",
        "description": "Sudden facial asymmetry/droop, weakness or paralysis in one arm, difficulty speaking or slurred speech, or sudden confusion.",
        "body_part_slug": "head",
        "symptom_slug": "facial_droop_speech",
        "immediate_action": "Call 911 / 112 immediately. Note the exact time symptoms started. Stroke treatments require rapid hospital intervention.",
        "risk_level": "critical"
    },
    {
        "slug": "severe_respiratory_distress",
        "title": "Severe Difficulty Breathing / Cyanosis",
        "description": "Unable to speak more than a couple of words, gasping for breath at rest, blue or gray coloring of lips/nails, or severe stridor.",
        "body_part_slug": "chest",
        "symptom_slug": "shortness_of_breath_severe",
        "immediate_action": "Call emergency services immediately. Sit upright and avoid lying down.",
        "risk_level": "critical"
    },
    {
        "slug": "meningitis_signs",
        "title": "High Fever with Inability to Flex Neck & Confusion",
        "description": "High temperature, excruciating headache, stiff rigid neck (unable to touch chin to chest), confusion, or sensitivity to light.",
        "body_part_slug": "general",
        "symptom_slug": "fever_stiff_neck_confusion",
        "immediate_action": "Seek nearest emergency department care without delay.",
        "risk_level": "critical"
    },
    {
        "slug": "anaphylactic_reaction",
        "title": "Anaphylaxis / Swelling of Lips, Tongue & Throat",
        "description": "Rapid throat tightness, hoarseness, difficulty swallowing or breathing, accompanied by widespread hives or dizziness.",
        "body_part_slug": "skin",
        "symptom_slug": "anaphylaxis_hives_lip_swelling",
        "immediate_action": "Administer intramuscular epinephrine auto-injector if available, and call 911 / 112 immediately.",
        "risk_level": "critical"
    },
    {
        "slug": "thunderclap_headache",
        "title": "Sudden Explosive Headache (Thunderclap)",
        "description": "Severe headache reaching peak intensity within 60 seconds, described as the worst headache in life.",
        "body_part_slug": "head",
        "symptom_slug": "headache_thunderclap",
        "immediate_action": "Emergency CT brain scan required immediately at nearest hospital.",
        "risk_level": "critical"
    },
    {
        "slug": "acute_gi_bleed",
        "title": "Vomiting Blood or Black Tarry Stools",
        "description": "Throwing up bright red blood or coffee-ground emesis, or passing shiny black tarry stools with lightheadedness.",
        "body_part_slug": "abdomen",
        "symptom_slug": "vomiting_blood_black_stools",
        "immediate_action": "Immediate emergency room admission for fluid resuscitation and emergency endoscopy.",
        "risk_level": "critical"
    },
    {
        "slug": "cauda_equina_syndrome",
        "title": "Severe Back Pain with Loss of Bladder/Bowel Control",
        "description": "Numbness in saddle region (inner thighs/groin), leg weakness, and sudden inability to control urination or bowel movements.",
        "body_part_slug": "back",
        "symptom_slug": "back_pain_numbness_bladder",
        "immediate_action": "Surgical emergency requiring immediate neurosurgical or orthopedic spine evaluation.",
        "risk_level": "critical"
    }
]

CARE_RULES = [
    {
        "rule_name": "Emergency Cardiac Check",
        "body_part_slug": "chest",
        "primary_symptom_slug": "chest_pain_crushing",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "hours",
        "recommended_specialty_slug": "cardiologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "EMERGENCY",
        "explanation": "Severe or radiating chest pain is a primary red flag for acute coronary syndromes (angina or myocardial infarction). Immediate emergency triage and ECG is vital.",
        "priority": 100
    },
    {
        "rule_name": "Acute Stroke FAST Protocol",
        "body_part_slug": "head",
        "primary_symptom_slug": "facial_droop_speech",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "hours",
        "recommended_specialty_slug": "neurologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "EMERGENCY",
        "explanation": "Sudden facial asymmetry or slurred speech represents an acute neurovascular emergency. Rapid emergency imaging and thrombolytic evaluation within the therapeutic time window is critical.",
        "priority": 100
    },
    {
        "rule_name": "Acute Severe Dyspnea Protocol",
        "body_part_slug": "chest",
        "primary_symptom_slug": "shortness_of_breath_severe",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "hours",
        "recommended_specialty_slug": "pulmonologist",
        "secondary_specialty_slug": "cardiologist",
        "triage_level": "EMERGENCY",
        "explanation": "Difficulty breathing at rest can indicate pulmonary embolism, severe asthma exacerbation, heart failure, or pneumonia. Immediate supplemental oxygen and hospital assessment required.",
        "priority": 95
    },
    {
        "rule_name": "Chronic Joint Morning Stiffness",
        "body_part_slug": "joints",
        "primary_symptom_slug": "symmetric_joint_morning_stiffness",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "days_4_7",
        "recommended_specialty_slug": "rheumatologist",
        "secondary_specialty_slug": "orthopedist",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Symmetric joint pain accompanied by stiffness lasting longer than 60 minutes in the morning strongly suggests autoimmune inflammatory arthritis (such as Rheumatoid Arthritis) rather than simple mechanical wear.",
        "priority": 50
    },
    {
        "rule_name": "Acute Gout Flare",
        "body_part_slug": "joints",
        "primary_symptom_slug": "sudden_swollen_hot_big_toe",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "hours",
        "recommended_specialty_slug": "rheumatologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "URGENT_SPECIALIST",
        "explanation": "Sudden excruciating pain and redness in the first metatarsophalangeal joint is classic for acute crystal-induced gouty arthritis. Rapid anti-inflammatory therapy and serum uric acid testing provide rapid relief.",
        "priority": 45
    },
    {
        "rule_name": "Chronic Migraine Evaluation",
        "body_part_slug": "head",
        "primary_symptom_slug": "headache_throbbing",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "days_4_7",
        "recommended_specialty_slug": "neurologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Throbbing, recurrent unilateral headaches with photophobia or nausea indicate migraine disorders. A neurologist can provide personalized preventive and abortive migraine regimens.",
        "priority": 40
    },
    {
        "rule_name": "Short-Term Mild Headache",
        "body_part_slug": "head",
        "primary_symptom_slug": "headache_throbbing",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "hours",
        "recommended_specialty_slug": "general_physician",
        "secondary_specialty_slug": "neurologist",
        "triage_level": "PRIMARY_CARE",
        "explanation": "Mild early headaches are commonly tension-related, dehydration-induced, or linked to eye strain. A General Physician can assess basic vitals and manage first-line relief.",
        "priority": 30
    },
    {
        "rule_name": "Persistent Cough & Airway Wheezing",
        "body_part_slug": "chest",
        "primary_symptom_slug": "persistent_cough_wheezing",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "weeks_1_2",
        "recommended_specialty_slug": "pulmonologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Cough lasting over 1-2 weeks with wheezing warrants spirometry testing by a Pulmonologist to rule out asthma, bronchitis, or chronic obstructive conditions.",
        "priority": 40
    },
    {
        "rule_name": "Gastroesophageal Reflux Disease (GERD)",
        "body_part_slug": "chest",
        "primary_symptom_slug": "burning_chest_reflux",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "days_4_7",
        "recommended_specialty_slug": "gastroenterologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Substernal burning after meals points toward acid reflux or peptic irritation. If persistent, a Gastroenterologist can evaluate esophageal lining health and optimize acid suppression.",
        "priority": 35
    },
    {
        "rule_name": "Suspicious Skin Mole ABCDE",
        "body_part_slug": "skin",
        "primary_symptom_slug": "unusual_changing_mole",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "weeks_1_2",
        "recommended_specialty_slug": "dermatologist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Any mole demonstrating border irregularity, color variegation, or progressive enlargement requires dermoscopic evaluation by a Dermatologist to screen for melanocytic atypia.",
        "priority": 50
    },
    {
        "rule_name": "Mechanical Lumbar Strain",
        "body_part_slug": "back",
        "primary_symptom_slug": "lower_back_pain_muscle",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "days_1_3",
        "recommended_specialty_slug": "orthopedist",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "PRIMARY_CARE",
        "explanation": "Lower back pain without nerve radiation is most commonly a muscular or facet strain. A General Physician or Orthopedist can advise on targeted physiotherapy and posture correction.",
        "priority": 25
    },
    {
        "rule_name": "Sciatica Lumbar Radiculopathy",
        "body_part_slug": "back",
        "primary_symptom_slug": "shooting_leg_pain_sciatica",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "days_4_7",
        "recommended_specialty_slug": "orthopedist",
        "secondary_specialty_slug": "neurologist",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Radiating shooting pain down the posterior leg corresponds to sciatic nerve root compression, frequently caused by a lumbar disc herniation. Orthopedic or neurological consultation is indicated.",
        "priority": 45
    },
    {
        "rule_name": "Acute Viral Illness & Fever",
        "body_part_slug": "general",
        "primary_symptom_slug": "fever_mild_body_aches",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "days_1_3",
        "recommended_specialty_slug": "general_physician",
        "secondary_specialty_slug": "general_physician",
        "triage_level": "PRIMARY_CARE",
        "explanation": "Short duration fever with body aches is consistent with self-limited viral syndromes. A General Physician provides optimal initial assessment and can order CBC/dengue/malaria tests if fever persists beyond 3 days.",
        "priority": 20
    },
    {
        "rule_name": "Chronic Unexplained Fatigue & Weight Loss",
        "body_part_slug": "general",
        "primary_symptom_slug": "chronic_fatigue_weight_loss",
        "secondary_symptom_slug": None,
        "min_severity": "moderate",
        "min_duration": "chronic",
        "recommended_specialty_slug": "general_physician",
        "secondary_specialty_slug": "endocrinologist",
        "triage_level": "SPECIALIST_CONSULT",
        "explanation": "Systemic exhaustion and involuntary weight loss require systematic laboratory workup (thyroid, diabetes screening, complete blood count, inflammatory markers) overseen by an internal medicine physician or Endocrinologist.",
        "priority": 40
    },
    {
        "rule_name": "Urinary Tract Infection Symptoms",
        "body_part_slug": "general",
        "primary_symptom_slug": "frequent_painful_urination",
        "secondary_symptom_slug": None,
        "min_severity": "mild",
        "min_duration": "days_1_3",
        "recommended_specialty_slug": "general_physician",
        "secondary_specialty_slug": "urologist",
        "triage_level": "PRIMARY_CARE",
        "explanation": "Dysuria and urinary frequency in the absence of high fever or flank pain can be diagnosed and treated promptly with routine urinalysis and targeted antibiotics by a General Physician.",
        "priority": 30
    }
]

DOCTORS = [
    # General Physicians
    {
        "name": "Dr. Rajesh Ramanathan",
        "title": "MBBS, MD (General Medicine)",
        "specialty_slug": "general_physician",
        "clinic_or_hospital": "Apollo Clinic & Wellness Center",
        "address": "42 Anna Salai, T. Nagar",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2829 0200",
        "email": "dr.rajesh.ramanathan@apollo.example.com",
        "rating": 4.9,
        "reviews_count": 184,
        "consultation_fee": "₹600",
        "available_hours": "Mon-Sat: 09:00 AM - 01:00 PM, 05:00 PM - 08:30 PM",
        "accepts_telehealth": True,
        "latitude": 13.0418,
        "longitude": 80.2341
    },
    {
        "name": "Dr. Priya Sundaram",
        "title": "MBBS, DNB (Family Medicine)",
        "specialty_slug": "general_physician",
        "clinic_or_hospital": "CareFirst Primary Health Clinic",
        "address": "15 100 Feet Road, Indiranagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 2521 8844",
        "email": "dr.priya@carefirst.example.com",
        "rating": 4.8,
        "reviews_count": 142,
        "consultation_fee": "₹700",
        "available_hours": "Mon-Sat: 08:30 AM - 02:00 PM",
        "accepts_telehealth": True,
        "latitude": 12.9784,
        "longitude": 77.6408
    },
    {
        "name": "Dr. Amitava Mukherjee",
        "title": "MBBS, MD (Internal Medicine)",
        "specialty_slug": "general_physician",
        "clinic_or_hospital": "Fortis Escorts Heart & Family Clinic",
        "address": "Okhla Road, New Friends Colony",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "phone": "+91 11 4713 5000",
        "email": "dr.amitava@fortis.example.com",
        "rating": 4.7,
        "reviews_count": 98,
        "consultation_fee": "₹800",
        "available_hours": "Mon-Fri: 10:00 AM - 05:00 PM",
        "accepts_telehealth": True,
        "latitude": 28.5615,
        "longitude": 77.2798
    },

    # Cardiologists
    {
        "name": "Dr. Anand Chockalingam",
        "title": "MBBS, MD, DM (Cardiology), FACC",
        "specialty_slug": "cardiologist",
        "clinic_or_hospital": "HeartCare Superspecialty Hospital",
        "address": "21 Greams Lane, Thousand Lights",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2829 3333",
        "email": "dr.anand@heartcare.example.com",
        "rating": 4.9,
        "reviews_count": 210,
        "consultation_fee": "₹1,200",
        "available_hours": "Mon-Fri: 10:00 AM - 04:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0583,
        "longitude": 80.2520
    },
    {
        "name": "Dr. Suresh K. Rao",
        "title": "MBBS, MD, DM (Cardiology)",
        "specialty_slug": "cardiologist",
        "clinic_or_hospital": "Narayana Institute of Cardiac Sciences",
        "address": "258/A Bommasandra Industrial Area",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 7122 2222",
        "email": "dr.suresh.rao@narayana.example.com",
        "rating": 4.9,
        "reviews_count": 315,
        "consultation_fee": "₹1,100",
        "available_hours": "Mon-Sat: 09:30 AM - 03:30 PM",
        "accepts_telehealth": True,
        "latitude": 12.8122,
        "longitude": 77.6947
    },
    {
        "name": "Dr. Meenakshi Bansal",
        "title": "MBBS, MD, DM (Interventional Cardiology)",
        "specialty_slug": "cardiologist",
        "clinic_or_hospital": "Max Super Speciality Hospital",
        "address": "1 Press Enclave Road, Saket",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "phone": "+91 11 2651 5050",
        "email": "dr.meenakshi@maxhealthcare.example.com",
        "rating": 4.8,
        "reviews_count": 160,
        "consultation_fee": "₹1,300",
        "available_hours": "Mon-Sat: 11:00 AM - 05:00 PM",
        "accepts_telehealth": True,
        "latitude": 28.5284,
        "longitude": 77.2115
    },

    # Neurologists
    {
        "name": "Dr. Deepa Chandrasekhar",
        "title": "MBBS, MD, DM (Neurology)",
        "specialty_slug": "neurologist",
        "clinic_or_hospital": "Brain & Spine Neuro Institute",
        "address": "88 Poonamallee High Road, Kilpauk",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2641 1234",
        "email": "dr.deepa@brainspine.example.com",
        "rating": 4.9,
        "reviews_count": 178,
        "consultation_fee": "₹1,000",
        "available_hours": "Mon-Fri: 09:00 AM - 02:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0784,
        "longitude": 80.2415
    },
    {
        "name": "Dr. Vikramaditya Kamath",
        "title": "MBBS, MD, DM (Neurology)",
        "specialty_slug": "neurologist",
        "clinic_or_hospital": "Manipal Comprehensive Neuro Center",
        "address": "98 HAL Old Airport Road, Kodihalli",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 2502 4444",
        "email": "dr.vikram@manipalhospitals.example.com",
        "rating": 4.8,
        "reviews_count": 224,
        "consultation_fee": "₹1,100",
        "available_hours": "Mon-Sat: 10:00 AM - 04:00 PM",
        "accepts_telehealth": True,
        "latitude": 12.9592,
        "longitude": 77.6534
    },

    # Pulmonologists
    {
        "name": "Dr. Karthik Narayanan",
        "title": "MBBS, MD (Pulmonary Medicine), FCCP",
        "specialty_slug": "pulmonologist",
        "clinic_or_hospital": "BreatheWell Chest & Allergy Clinic",
        "address": "12 Sardar Patel Road, Adyar",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2441 5566",
        "email": "dr.karthik@breathewell.example.com",
        "rating": 4.8,
        "reviews_count": 135,
        "consultation_fee": "₹900",
        "available_hours": "Mon-Sat: 10:00 AM - 06:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0067,
        "longitude": 80.2570
    },
    {
        "name": "Dr. Shalini Deshpande",
        "title": "MBBS, DNB (Respiratory Diseases)",
        "specialty_slug": "pulmonologist",
        "clinic_or_hospital": "Aster CMI Pulmonary Institute",
        "address": "No. 43/2 New Airport Road, Sahakara Nagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 4345 5555",
        "email": "dr.shalini@astercmi.example.com",
        "rating": 4.7,
        "reviews_count": 112,
        "consultation_fee": "₹950",
        "available_hours": "Mon-Fri: 09:00 AM - 03:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0587,
        "longitude": 77.5925
    },

    # Gastroenterologists
    {
        "name": "Dr. Senthil Kumar Velu",
        "title": "MBBS, MS, MCh (Surgical Gastro)",
        "specialty_slug": "gastroenterologist",
        "clinic_or_hospital": "Digestive Disease Institute",
        "address": "33 Nelson Manickam Road, Aminjikarai",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2374 8899",
        "email": "dr.senthil@digestivecare.example.com",
        "rating": 4.9,
        "reviews_count": 195,
        "consultation_fee": "₹1,000",
        "available_hours": "Mon-Sat: 11:00 AM - 07:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0722,
        "longitude": 80.2185
    },
    {
        "name": "Dr. Harish K. Bhat",
        "title": "MBBS, MD, DM (Gastroenterology)",
        "specialty_slug": "gastroenterologist",
        "clinic_or_hospital": "Columbia Asia Liver & Gastro Center",
        "address": "26/4 Brigade Gateway, Malleshwaram",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 3989 8969",
        "email": "dr.harish@columbiagastro.example.com",
        "rating": 4.8,
        "reviews_count": 140,
        "consultation_fee": "₹1,050",
        "available_hours": "Mon-Fri: 10:00 AM - 05:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0125,
        "longitude": 77.5548
    },

    # Dermatologists
    {
        "name": "Dr. Ananya Ravichandran",
        "title": "MBBS, MD (Dermatology, Venereology & Leprosy)",
        "specialty_slug": "dermatologist",
        "clinic_or_hospital": "DermaGlow Skin & Laser Center",
        "address": "55 G.N. Chetty Road, T. Nagar",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2815 6777",
        "email": "dr.ananya@dermaglow.example.com",
        "rating": 4.9,
        "reviews_count": 260,
        "consultation_fee": "₹800",
        "available_hours": "Mon-Sat: 10:00 AM - 07:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0421,
        "longitude": 80.2412
    },
    {
        "name": "Dr. Ritu Verma",
        "title": "MBBS, DVD, MD (Dermatology)",
        "specialty_slug": "dermatologist",
        "clinic_or_hospital": "Kaya Skin Clinic & Laser Suite",
        "address": "12 80 Feet Road, 4th Block, Koramangala",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 4110 3300",
        "email": "dr.ritu@kayaskin.example.com",
        "rating": 4.7,
        "reviews_count": 188,
        "consultation_fee": "₹850",
        "available_hours": "Mon-Sun: 10:30 AM - 07:30 PM",
        "accepts_telehealth": True,
        "latitude": 12.9344,
        "longitude": 77.6258
    },

    # Orthopedic Surgeons
    {
        "name": "Dr. Murugan Thirunavukarasu",
        "title": "MBBS, MS (Ortho), MCh (Ortho, UK)",
        "specialty_slug": "orthopedist",
        "clinic_or_hospital": "OrthoJoint Bone & Joint Hospital",
        "address": "74 TTK Road, Alwarpet",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2499 4455",
        "email": "dr.murugan@orthojoint.example.com",
        "rating": 4.9,
        "reviews_count": 240,
        "consultation_fee": "₹900",
        "available_hours": "Mon-Sat: 09:30 AM - 02:00 PM, 05:00 PM - 08:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0368,
        "longitude": 80.2524
    },
    {
        "name": "Dr. Chetan Gowda",
        "title": "MBBS, MS (Orthopedics), Fellowship Joint Replacement",
        "specialty_slug": "orthopedist",
        "clinic_or_hospital": "Sparsh Hospital for Advanced Surgeries",
        "address": "146 Infantry Road, Vasanth Nagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 6766 6766",
        "email": "dr.chetan@sparshhospital.example.com",
        "rating": 4.8,
        "reviews_count": 215,
        "consultation_fee": "₹950",
        "available_hours": "Mon-Sat: 10:00 AM - 04:30 PM",
        "accepts_telehealth": True,
        "latitude": 12.9822,
        "longitude": 77.5985
    },

    # ENT Specialists
    {
        "name": "Dr. Vasanth Balakrishnan",
        "title": "MBBS, MS (ENT), DLO",
        "specialty_slug": "ent_specialist",
        "clinic_or_hospital": "SoundSense Ear & Sinus Center",
        "address": "19 Harrington Road, Chetpet",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2836 2211",
        "email": "dr.vasanth@soundsense.example.com",
        "rating": 4.8,
        "reviews_count": 150,
        "consultation_fee": "₹750",
        "available_hours": "Mon-Sat: 10:00 AM - 01:00 PM, 04:30 PM - 07:30 PM",
        "accepts_telehealth": True,
        "latitude": 13.0718,
        "longitude": 80.2372
    },
    {
        "name": "Dr. Ayesha Firdous",
        "title": "MBBS, DNB (Otorhinolaryngology)",
        "specialty_slug": "ent_specialist",
        "clinic_or_hospital": "Fortis ENT & Hearing Clinic",
        "address": "154/9 Bannerghatta Road, Opp IIMB",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 6621 4444",
        "email": "dr.ayesha@fortishealth.example.com",
        "rating": 4.7,
        "reviews_count": 130,
        "consultation_fee": "₹800",
        "available_hours": "Mon-Fri: 09:30 AM - 04:00 PM",
        "accepts_telehealth": True,
        "latitude": 12.8988,
        "longitude": 77.5997
    },

    # Ophthalmologists
    {
        "name": "Dr. Radhika Srinivasan",
        "title": "MBBS, MS (Ophthalmology), FICO (UK)",
        "specialty_slug": "ophthalmologist",
        "clinic_or_hospital": "ClearSight Eye Hospital & Laser Center",
        "address": "18 Cathedral Road, Gopalapuram",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2811 7722",
        "email": "dr.radhika@clearsight.example.com",
        "rating": 4.9,
        "reviews_count": 275,
        "consultation_fee": "₹700",
        "available_hours": "Mon-Sat: 09:00 AM - 05:00 PM",
        "accepts_telehealth": True,
        "latitude": 13.0489,
        "longitude": 80.2562
    },
    {
        "name": "Dr. Karthikeyan N.",
        "title": "MBBS, DO, DNB (Ophthalmology)",
        "specialty_slug": "ophthalmologist",
        "clinic_or_hospital": "Narayana Nethralaya",
        "address": "121/C Chord Road, Rajajinagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 6612 1641",
        "email": "dr.karthik@narayananethralaya.example.com",
        "rating": 4.9,
        "reviews_count": 340,
        "consultation_fee": "₹750",
        "available_hours": "Mon-Sat: 08:30 AM - 05:30 PM",
        "accepts_telehealth": True,
        "latitude": 13.0012,
        "longitude": 77.5521
    },

    # Rheumatologists
    {
        "name": "Dr. Meera Krishnakumar",
        "title": "MBBS, MD, DM (Clinical Immunology & Rheumatology)",
        "specialty_slug": "rheumatologist",
        "clinic_or_hospital": "Autoimmune & Arthritis Institute",
        "address": "62 Haddows Road, Nungambakkam",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "country": "India",
        "phone": "+91 44 2827 9900",
        "email": "dr.meera@autoimmunecare.example.com",
        "rating": 4.9,
        "reviews_count": 165,
        "consultation_fee": "₹1,200",
        "available_hours": "Mon-Fri: 10:00 AM - 03:30 PM",
        "accepts_telehealth": True,
        "latitude": 13.0612,
        "longitude": 80.2458
    },
    {
        "name": "Dr. Ashok Sengupta",
        "title": "MBBS, MD, FACR (Rheumatology)",
        "specialty_slug": "rheumatologist",
        "clinic_or_hospital": "Bengaluru Arthritis & Joint Care",
        "address": "77 Richmond Road, Ashok Nagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "phone": "+91 80 2221 8899",
        "email": "dr.ashok@bengaluruarthritis.example.com",
        "rating": 4.8,
        "reviews_count": 120,
        "consultation_fee": "₹1,150",
        "available_hours": "Mon-Sat: 11:00 AM - 04:00 PM",
        "accepts_telehealth": True,
        "latitude": 12.9667,
        "longitude": 77.6083
    }
]
