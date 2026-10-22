/**
 * MediGuide — Internationalization (i18n) Engine
 * Full Multilingual Support for English, Telugu (తెలుగు), and Hindi (हिन्दी)
 */

const I18N = {
  currentLang: localStorage.getItem('mediguide-lang') || 'en',

  translations: {
    en: {
      // Navbar & Emergency
      emergency_notice: "Care-Navigation Notice: MediGuide provides educational care navigation, NOT a medical diagnosis. For life-threatening emergencies, dial 911 / 112 immediately.",
      emergency_btn: "Emergency Hotlines 🚨",
      nav_body: "Body Hologram",
      nav_checker: "Symptom Checker",
      nav_guidance: "Care Guidance",
      nav_doctors: "Find Doctors",
      nav_emergency: "112 / 911",

      // Hero Section
      hero_badge: "Transparent Clinical Rule Logic — Not A Diagnostic Guess",
      hero_title_1: "Smart Healthcare",
      hero_title_glow: "Symptom Guidance",
      hero_title_2: "& Doctor Discovery",
      hero_desc: "Explore the biometric body hologram to locate where it hurts, evaluate symptoms against clinical safety rules, and discover exactly which doctor specialty to consult — with verified nearby doctors and directions.",
      hero_btn_scan: "Launch Hologram Scanner",
      hero_btn_symptoms: "Evaluate Symptoms",
      hero_btn_redflags: "Safety Red Flags",
      telemetry_title: "LIVE TELEMETRY MONITOR",
      telemetry_status: "● SYSTEM OPERATIONAL",
      telemetry_hr: "Heart Rate (BPM)",
      telemetry_spo2: "SpO2 Oxygen",
      telemetry_engine: "Rule-Engine",

      // Trust metrics
      metric_1: "Holographic Anatomical Scanner",
      metric_2: "15+ Medical Specialties",
      metric_3: "Explainable Care Pathways",
      metric_4: "Verified Nearby Doctors & Maps",

      // Step 1: Body Diagram
      step1_tag: "Anatomical Telemetry",
      step1_title: "Biometric Hologram Scanner",
      step1_desc: "Hover and click any anatomical hotspot below to instantly filter symptoms for that body area.",
      view_front: "Front Scan",
      view_back: "Dorsal / Spine",
      sys_all: "⚡ All Systems",
      sys_neuro: "🧠 Neurological",
      sys_cardio: "❤️ Cardiopulmonary",
      sys_gastro: "🥣 Gastrointestinal",
      sys_ortho: "🦴 Spine & Joints",
      sys_derma: "🧴 Cutaneous",
      hud_all_title: "Full Body Telemetry Scan",
      hud_all_desc: "Scan active across all biological organ systems",
      hud_filter_btn: "Filter Symptoms →",

      // Step 2: Symptom Form
      step2_tag: "Clinical Parameters",
      step2_title: "Symptom Evaluation Form",
      step2_desc: "Search symptoms and specify duration, pain level, and severity to trigger care rules.",
      search_label: "Search Symptoms",
      search_hint: "(e.g., headache, chest tightness, knee pain, rash)",
      search_placeholder: "Type to filter symptoms instantly...",
      primary_label: "Primary Symptom",
      primary_hint: "(Select the primary reason for your concern)",
      associated_label: "Associated Symptoms",
      associated_hint: "(Optional — select any other symptoms occurring together)",
      pain_dial_label: "Pain / Discomfort Intensity Dial",
      pain_dial_sub: "Slide to adjust perceived severity",
      dur_label: "Duration of Symptoms",
      dur_hours: "< 24 Hours",
      dur_days_1_3: "1–3 Days",
      dur_days_4_7: "4–7 Days",
      dur_weeks_1_2: "1–2 Weeks",
      dur_chronic: "> 2 Weeks (Chronic)",
      patient_group_label: "Patient Group",
      age_adult: "Adult (18–64 years)",
      age_senior: "Senior (65+ years)",
      age_child: "Child / Adolescent (0–17 years)",
      location_label: "Location / City",
      redflag_title: "Emergency Warning Check (Critical Safety Signs)",
      redflag_desc: "If any of these critical warning signs apply, check them below. MediGuide will immediately prioritize emergency triage.",
      btn_evaluate: "Get Care Guidance & Doctor Recommendation",

      // Step 3: Care Guidance Results
      guidance_title: "Recommended Pathway",
      guidance_reasoning_title: "Transparent Rule-Based Guidance Logic (Why this specialist was suggested)",
      guidance_checklist_title: "Doctor Appointment Preparation Checklist",
      guidance_disclaimer: "Clinical Navigation Disclaimer: MediGuide provides transparent care-navigation advice to assist patients in selecting suitable medical disciplines and recognizing emergency warning signs. It is NOT a medical diagnosis and cannot replace in-person clinical examinations.",
      btn_print: "Print / Export Care Guidance Summary",
      find_matching_docs: "Find Matching Doctors Nearby",

      // Step 4: Doctor Discovery
      step4_tag: "Direct Doctor Discovery",
      step4_title: "Nearby Verified Doctors & Clinics",
      step4_desc: "Find specialists matching your guidance recommendation with directions and direct booking.",
      filter_specialty: "Specialty:",
      filter_city: "City:",
      filter_all_specialties: "All Specialties",
      filter_all_cities: "All Locations",
      btn_gps: "Use My Current Location",
      btn_maps: "Google Maps",
      btn_book: "Book Consult"
    },

    te: {
      // Navbar & Emergency
      emergency_notice: "సంరక్షణ-మార్గదర్శక నోటీసు: MediGuide విద్యా సంరక్షణ మార్గదర్శకత్వాన్ని మాత్రమే అందిస్తుంది, వైద్య నిర్ధారణ కాదు. అత్యవసర పరిస్థితుల్లో వెంటనే 112 / 108 కి కాల్ చేయండి.",
      emergency_btn: "అత్యవసర హెల్ప్‌లైన్లు 🚨",
      nav_body: "శరీర హోలోగ్రామ్",
      nav_checker: "లక్షణాల తనిఖీ",
      nav_guidance: "సంరక్షణ మార్గదర్శకత్వం",
      nav_doctors: "వైద్యులను కనుగొనండి",
      nav_emergency: "112 / 108",

      // Hero Section
      hero_badge: "పారదర్శక క్లినికల్ నియమాల ఆధారిత మార్గదర్శకత్వం — ఊహాజనిత నిర్ధారణ కాదు",
      hero_title_1: "స్మార్ట్ హెల్త్‌కేర్",
      hero_title_glow: "లక్షణాల మార్గదర్శకత్వం",
      hero_title_2: "& వైద్యుల శోధన",
      hero_desc: "ఎక్కడ నొప్పిగా ఉందో గుర్తించడానికి బయోమెట్రిక్ శరీర హోలోగ్రామ్‌ను అన్వేషించండి, క్లినికల్ భద్రతా నియమాల ప్రకారం లక్షణాలను అంచనా వేయండి మరియు ఏ ప్రత్యేక వైద్యుడిని సంప్రదించాలో ఖచ్చితంగా తెలుసుకోండి.",
      hero_btn_scan: "హోలోగ్రామ్ స్కానర్ ప్రారంభించండి",
      hero_btn_symptoms: "లక్షణాలను తనిఖీ చేయండి",
      hero_btn_redflags: "అత్యవసర హెచ్చరికలు",
      telemetry_title: "లైవ్ టెలిమెట్రీ మానిటర్",
      telemetry_status: "● సిస్టమ్ సజావుగా పనిచేస్తోంది",
      telemetry_hr: "హృదయ స్పందన రేటు (BPM)",
      telemetry_spo2: "ఆక్సిజన్ శాతం (SpO2)",
      telemetry_engine: "రూల్-ఇంజిన్",

      // Trust metrics
      metric_1: "హోలోగ్రాఫిక్ అనాటమికల్ స్కానర్",
      metric_2: "15+ వైద్య విభాగాలు",
      metric_3: "వివరణాత్మక సంరక్షణ మార్గాలు",
      metric_4: "ధృవీకరించబడిన వైద్యులు & మ్యాప్‌లు",

      // Step 1: Body Diagram
      step1_tag: "శరీర భాగాల స్కానింగ్",
      step1_title: "బయోమెట్రిక్ హోలోగ్రామ్ బాడీ స్కానర్",
      step1_desc: "ఆ శరీర భాగానికి సంబంధించిన లక్షణాలను తక్షణమే ఫిల్టర్ చేయడానికి క్రింది శరీర భాగాన్ని క్లిక్ చేయండి.",
      view_front: "ముందు భాగం స్కాన్",
      view_back: "వెనుక / వెన్నెముక",
      sys_all: "⚡ అన్ని వ్యవస్థలు",
      sys_neuro: "🧠 నరాల వ్యవస్థ",
      sys_cardio: "❤️ గుండె & ఊపిరితిత్తులు",
      sys_gastro: "🥣 జీర్ణవ్యవస్థ",
      sys_ortho: "🦴 వెన్నెముక & కీళ్ళు",
      sys_derma: "🧴 చర్మం",
      hud_all_title: "పూర్తి శరీర టెలిమెట్రీ స్కాన్",
      hud_all_desc: "అన్ని జీవ అవయవ వ్యవస్థలలో స్కాన్ సక్రియంగా ఉంది",
      hud_filter_btn: "లక్షణాలను ఫిల్టర్ చేయండి →",

      // Step 2: Symptom Form
      step2_tag: "క్లినికల్ వివరాలు",
      step2_title: "లక్షణాల మూల్యాంకన ఫారమ్",
      step2_desc: "సంరక్షణ నియమాలను ప్రారంభించడానికి లక్షణాలను శోధించండి మరియు వ్యవధి, నొప్పి స్థాయిని పేర్కొనండి.",
      search_label: "లక్షణాలను వెతకండి",
      search_hint: "(ఉదా: తలనొప్పి, ఛాతీలో బిగుతు, మోకాలి నొప్పి, దద్దుర్లు)",
      search_placeholder: "లక్షణాల కోసం ఇక్కడ టైప్ చేయండి...",
      primary_label: "ప్రధాన లక్షణం",
      primary_hint: "(మీ సమస్యకు గల ప్రధాన కారణాన్ని ఎంచుకోండి)",
      associated_label: "అనుబంధ లక్షణాలు",
      associated_hint: "(ఐచ్ఛికం — కలిసి వచ్చే ఇతర లక్షణాలను ఎంచుకోండి)",
      pain_dial_label: "నొప్పి తీవ్రత డయల్ (1 నుండి 10)",
      pain_dial_sub: "నొప్పి తీవ్రతను సర్దుబాటు చేయడానికి స్లయిడ్ చేయండి",
      dur_label: "లక్షణాలు ప్రారంభమైన సమయం (వ్యవధి)",
      dur_hours: "< 24 గంటలు",
      dur_days_1_3: "1–3 రోజులు",
      dur_days_4_7: "4–7 రోజులు",
      dur_weeks_1_2: "1–2 వారాలు",
      dur_chronic: "> 2 వారాలు (దీర్ఘకాలిక)",
      patient_group_label: "రోగి వర్గం",
      age_adult: "వయోజనులు (18–64 సంవత్సరాలు)",
      age_senior: "వృద్ధులు (65+ సంవత్సరాలు)",
      age_child: "పిల్లలు / కౌమారదశ (0–17 సంవత్సరాలు)",
      location_label: "ప్రాంతం / నగరం",
      redflag_title: "అత్యవసర హెచ్చరిక తనిఖీ (కీలక భద్రతా సంకేతాలు)",
      redflag_desc: "ఈ కీలకమైన హెచ్చరిక సంకేతాలలో ఏవైనా ఉంటే, క్రింద టిక్ చేయండి. MediGuide వెంటనే అత్యవసర చికిత్సకు ప్రాధాన్యత ఇస్తుంది.",
      btn_evaluate: "సంరక్షణ మార్గదర్శకత్వం & వైద్యుల సిఫార్సు పొందండి",

      // Step 3: Care Guidance Results
      guidance_title: "సిఫార్సు చేయబడిన సంరక్షణ మార్గం",
      guidance_reasoning_title: "పారదర్శక క్లినికల్ లాజిక్ (ఈ స్పెషలిస్ట్‌ను ఎందుకు సూచించారు)",
      guidance_checklist_title: "డాక్టర్ అపాయింట్‌మెంట్ ప్రిపరేషన్ చెక్‌లిస్ట్",
      guidance_disclaimer: "క్లినికల్ మార్గదర్శక నోటీసు: MediGuide రోగులకు తగిన వైద్య విభాగాన్ని ఎంచుకోవడంలో మరియు అత్యవసర సంకేతాలను గుర్తించడంలో సహాయపడటానికి పారదర్శక మార్గదర్శకత్వాన్ని అందిస్తుంది. ఇది వైద్య నిర్ధారణ కాదు మరియు ప్రత్యక్ష వైద్య పరీక్షలను భర్తీ చేయదు.",
      btn_print: "సారాంశాన్ని ముద్రించండి / డౌన్‌లోడ్ చేయండి",
      find_matching_docs: "సమీపంలోని సంబంధిత వైద్యులను కనుగొనండి",

      // Step 4: Doctor Discovery
      step4_tag: "ప్రత్యక్ష వైద్యుల శోధన",
      step4_title: "సమీపంలోని ధృవీకరించబడిన వైద్యులు & క్లినిక్‌లు",
      step4_desc: "మీ మార్గదర్శక సిఫార్సుకు సరిపోలే నిపుణులను సులభంగా కనుగొనండి మరియు అపాయింట్‌మెంట్ బుక్ చేసుకోండి.",
      filter_specialty: "విభాగం:",
      filter_city: "నగరం:",
      filter_all_specialties: "అన్ని విభాగాలు",
      filter_all_cities: "అన్ని నగరాలు",
      btn_gps: "నా ప్రస్తుత లొకేషన్ ఉపయోగించండి",
      btn_maps: "గూగుల్ మ్యాప్స్",
      btn_book: "అపాయింట్‌మెంట్ బుక్ చేయండి"
    },

    hi: {
      // Navbar & Emergency
      emergency_notice: "देखभाल-मार्गदर्शन सूचना: MediGuide केवल शैक्षिक मार्गदर्शन प्रदान करता है, कोई चिकित्सकीय निदान नहीं। आपातकालीन स्थिति में तुरंत 112 / 108 डायल करें।",
      emergency_btn: "आपातकालीन हेल्पलाइन 🚨",
      nav_body: "शरीर होलोग्राम",
      nav_checker: "लक्षण परीक्षक",
      nav_guidance: "देखभाल मार्गदर्शन",
      nav_doctors: "डॉक्टर खोजें",
      nav_emergency: "112 / 108",

      // Hero Section
      hero_badge: "पारदर्शी क्लिनिकल नियम-आधारित मार्गदर्शन — नैदानिक अनुमान नहीं",
      hero_title_1: "स्मार्ट हेल्थकेयर",
      hero_title_glow: "लक्षण मार्गदर्शन",
      hero_title_2: "& डॉक्टर खोज",
      hero_desc: "कहाँ दर्द हो रहा है यह जानने के लिए बायोमेट्रिक बॉडी होलोग्राम का उपयोग करें, क्लिनिकल सुरक्षा नियमों के अनुसार लक्षणों का मूल्यांकन करें और जानें कि किस विशेषज्ञ डॉक्टर से परामर्श लेना है।",
      hero_btn_scan: "होलोग्राम स्कैनर शुरू करें",
      hero_btn_symptoms: "लक्षणों की जांच करें",
      hero_btn_redflags: "आपातकालीन चेतावनी",
      telemetry_title: "लाइव टेलीमेट्री मॉनिटर",
      telemetry_status: "● सिस्टम सुचारू रूप से सक्रिय",
      telemetry_hr: "हृदय गति (BPM)",
      telemetry_spo2: "ऑक्सीजन स्तर (SpO2)",
      telemetry_engine: "रूल-इंजन",

      // Trust metrics
      metric_1: "होलोग्राफिक एनाटॉमिकल स्कैनर",
      metric_2: "15+ चिकित्सा विशेषताएं",
      metric_3: "पारदर्शी देखभाल मार्ग",
      metric_4: "सत्यापित डॉक्टर और मानचित्र",

      // Step 1: Body Diagram
      step1_tag: "शारीरिक टेलीमेट्री",
      step1_title: "बायोमेट्रिक होलोग्राम बॉडी स्कैनर",
      step1_desc: "उस शारीरिक क्षेत्र के लक्षणों को तुरंत देखने के लिए नीचे किसी भी हॉटस्पॉट पर क्लिक करें।",
      view_front: "सामने का दृश्य",
      view_back: "पीठ / रीढ़",
      sys_all: "⚡ सभी प्रणालियां",
      sys_neuro: "🧠 तंत्रिका तंत्र",
      sys_cardio: "❤️ हृदय और फेफड़े",
      sys_gastro: "🥣 पाचन तंत्र",
      sys_ortho: "🦴 रीढ़ और जोड़",
      sys_derma: "🧴 त्वचा",
      hud_all_title: "पूर्ण शारीरिक टेलीमेट्री स्कैन",
      hud_all_desc: "सभी जैविक अंग प्रणालियों में स्कैन सक्रिय है",
      hud_filter_btn: "लक्षण फिल्टर करें →",

      // Step 2: Symptom Form
      step2_tag: "क्लिनिकल पैरामीटर",
      step2_title: "लक्षण मूल्यांकन फॉर्म",
      step2_desc: "देखभाल नियमों को ट्रिगर करने के लिए लक्षणों को खोजें और अवधि व दर्द की तीव्रता दर्ज करें।",
      search_label: "लक्षण खोजें",
      search_hint: "(उदा: सिरदर्द, छाती में दर्द, घुटने का दर्द, दाने)",
      search_placeholder: "लक्षणों को खोजने के लिए टाइप करें...",
      primary_label: "मुख्य लक्षण",
      primary_hint: "(अपनी समस्या का प्राथमिक कारण चुनें)",
      associated_label: "सहवर्ती लक्षण",
      associated_hint: "(वैकल्पिक — साथ में होने वाले अन्य लक्षण चुनें)",
      pain_dial_label: "दर्द तीव्रता डायल (1 से 10)",
      pain_dial_sub: "दर्द की गंभीरता समायोजित करने के लिए स्लाइड करें",
      dur_label: "लक्षणों की अवधि (समय)",
      dur_hours: "< 24 घंटे",
      dur_days_1_3: "1–3 दिन",
      dur_days_4_7: "4–7 दिन",
      dur_weeks_1_2: "1–2 सप्ताह",
      dur_chronic: "> 2 सप्ताह (क्रोनिक)",
      patient_group_label: "मरीज का वर्ग",
      age_adult: "वयस्क (18–64 वर्ष)",
      age_senior: "वरिष्ठ नागरिक (65+ वर्ष)",
      age_child: "बच्चे / किशोर (0–17 वर्ष)",
      location_label: "स्थान / शहर",
      redflag_title: "आपातकालीन चेतावनी जांच (महत्वपूर्ण खतरे के संकेत)",
      redflag_desc: "यदि इनमें से कोई भी गंभीर लक्षण है, तो नीचे टिक करें। MediGuide तुरंत आपातकालीन चिकित्सा को प्राथमिकता देगा।",
      btn_evaluate: "देखभाल मार्गदर्शन और डॉक्टर सिफारिश प्राप्त करें",

      // Step 3: Care Guidance Results
      guidance_title: "अनुशंसित चिकित्सा मार्ग",
      guidance_reasoning_title: "पारदर्शी क्लिनिकल तर्क (इस विशेषज्ञ का सुझाव क्यों दिया गया)",
      guidance_checklist_title: "डॉक्टर अपॉइंटमेंट तैयारी चेकलिस्ट",
      guidance_disclaimer: "क्लिनिकल अस्वीकरण: MediGuide मरीजों को सही विशेषज्ञ चुनने और आपातकालीन संकेतों को पहचानने में सहायता के लिए पारदर्शी मार्गदर्शन प्रदान करता है। यह कोई डॉक्टरी निदान नहीं है और यह व्यक्तिगत क्लिनिकल परीक्षण का विकल्प नहीं है।",
      btn_print: "सारांश प्रिंट / डाउनलोड करें",
      find_matching_docs: "आस-पास संबंधित डॉक्टर खोजें",

      // Step 4: Doctor Discovery
      step4_tag: "प्रत्यक्ष डॉक्टर खोज",
      step4_title: "आस-पास के सत्यापित डॉक्टर और क्लीनिक",
      step4_desc: "अपनी सिफारिश से मेल खाने वाले विशेषज्ञों को खोजें, दिशा-निर्देश देखें और अपॉइंटमेंट बुक करें।",
      filter_specialty: "विशेषज्ञता:",
      filter_city: "शहर:",
      filter_all_specialties: "सभी विशेषज्ञताएं",
      filter_all_cities: "सभी शहर",
      btn_gps: "मेरा वर्तमान स्थान उपयोग करें",
      btn_maps: "गूगल मैप्स",
      btn_book: "अपॉइंटमेंट बुक करें"
    }
  },

  // Localized body parts metadata
  bodyPartsI18n: {
    en: {
      head: "Head & Brain Cortex",
      eyes: "Eyes & Vision",
      ent: "Ears, Nose & Throat",
      neck: "Neck & Cervical Spine",
      chest: "Chest & Heart/Lungs",
      abdomen: "Abdomen & Digestion",
      back: "Back & Spine Axis",
      joints: "Joints & Limbs",
      skin: "Skin & Cutaneous",
      general: "General & Whole Body"
    },
    te: {
      head: "తల & మెదడు",
      eyes: "కళ్ళు & దృష్టి",
      ent: "చెవి, ముక్కు & గొంతు (ENT)",
      neck: "మెడ & గర్భాశయ వెన్నెముక",
      chest: "ఛాతీ, గుండె & ఊపిరితిత్తులు",
      abdomen: "కడుపు & జీర్ణవ్యవస్థ",
      back: "వీపు & వెన్నెముక",
      joints: "కీళ్ళు & అవయవాలు",
      skin: "చర్మం & ఉపరితలం",
      general: "సాధారణ & మొత్తం శరీరం"
    },
    hi: {
      head: "सिर और मस्तिष्क",
      eyes: "आंखें और दृष्टि",
      ent: "कान, नाक और गला (ENT)",
      neck: "गर्दन और ग्रीवा रीढ़",
      chest: "छाती, हृदय और फेफड़े",
      abdomen: "पेट और पाचन तंत्र",
      back: "पीठ और रीढ़",
      joints: "जोड़ और अंग",
      skin: "त्वचा और बाहरी परत",
      general: "सामान्य और पूरा शरीर"
    }
  },

  // Localized specialties
  specialtiesI18n: {
    en: {
      general_physician: "General Physician / Family Doctor",
      cardiologist: "Cardiologist",
      pulmonologist: "Pulmonologist / Chest Physician",
      neurologist: "Neurologist",
      gastroenterologist: "Gastroenterologist",
      dermatologist: "Dermatologist",
      orthopedist: "Orthopedic Specialist",
      ent_specialist: "ENT Specialist",
      ophthalmologist: "Ophthalmologist / Eye Specialist",
      psychiatrist: "Psychiatrist",
      urologist: "Urologist",
      rheumatologist: "Rheumatologist",
      endocrinologist: "Endocrinologist",
      emergency_medicine: "Emergency Department / Casualty"
    },
    te: {
      general_physician: "జనరల్ ఫిజీషియన్ / కుటుంబ వైద్యుడు",
      cardiologist: "కార్డియాలజిస్ట్ (గుండె నిపుణుడు)",
      pulmonologist: "పల్మోనాలజిస్ట్ (ఊపిరితిత్తుల నిపుణుడు)",
      neurologist: "న్యూరాలజిస్ట్ (నరాల నిపుణుడు)",
      gastroenterologist: "గ్యాస్ట్రోఎంటరాలజిస్ట్ (జీర్ణకోశ నిపుణుడు)",
      dermatologist: "డెర్మటాలజిస్ట్ (చర్మ నిపుణుడు)",
      orthopedist: "ఆర్థోపెడిస్ట్ (ఎముకలు & కీళ్ళ నిపుణుడు)",
      ent_specialist: "ఈఎన్‌టీ స్పెషలిస్ట్ (చెవి, ముక్కు, గొంతు)",
      ophthalmologist: "ఆప్తాల్మాలజిస్ట్ (కంటి నిపుణుడు)",
      psychiatrist: "సైకియాట్రిస్ట్ (మానసిక వైద్య నిపుణుడు)",
      urologist: "యూరాలజిస్ట్ (మూత్రకోశ నిపుణుడు)",
      rheumatologist: "రుమటాలజిస్ట్ (కీళ్ళవాత నిపుణుడు)",
      endocrinologist: "ఎండోక్రినాలజిస్ట్ (హార్మోన్ నిపుణుడు)",
      emergency_medicine: "అత్యవసర విభాగం / క్యాజువాలిటీ మెడికల్ ఆఫీసర్"
    },
    hi: {
      general_physician: "जनरल फिजिशियन / पारिवारिक डॉक्टर",
      cardiologist: "कार्डियोलॉजिस्ट (हृदय रोग विशेषज्ञ)",
      pulmonologist: "पल्मोनोलॉजिस्ट (फेफड़े रोग विशेषज्ञ)",
      neurologist: "न्यूरोलॉजिस्ट (तंत्रिका तंत्र विशेषज्ञ)",
      gastroenterologist: "गैस्ट्रोएंटेरोलॉजिस्ट (पेट व पाचन विशेषज्ञ)",
      dermatologist: "डर्मेटोलॉजिस्ट (त्वचा रोग विशेषज्ञ)",
      orthopedist: "ऑर्थोपेडिक सर्जन (हड्डी व जोड़ विशेषज्ञ)",
      ent_specialist: "ईएनटी विशेषज्ञ (कान, नाक, गला)",
      ophthalmologist: "नेत्र रोग विशेषज्ञ (आई स्पेशलिस्ट)",
      psychiatrist: "मनोचिकित्सक (साइकियाट्रिस्ट)",
      urologist: "यूरोलॉजिस्ट (मूत्र रोग विशेषज्ञ)",
      rheumatologist: "रूमेटोलॉजिस्ट (गठिया व जोड़ों के विशेषज्ञ)",
      endocrinologist: "एंडोक्रिनोलॉजिस्ट (हार्मोन विशेषज्ञ)",
      emergency_medicine: "आपातकालीन विभाग / कैजुअल्टी चिकित्सा अधिकारी"
    }
  },

  // Localized common symptoms
  symptomsI18n: {
    en: {
      chest_pain_crushing: "Severe Crushing Chest Pressure / Radiating to Left Arm or Jaw",
      facial_droop_speech: "Facial Drooping, Arm Weakness, or Slurred Speech (FAST)",
      shortness_of_breath_severe: "Severe Difficulty Breathing / Gasping for Air at Rest",
      headache_throbbing: "Throbbing or One-Sided Headache",
      headache_thunderclap: "Sudden 'Worst Headache of Life' (Thunderclap)",
      dizziness_vertigo: "Dizziness / Room Spinning (Vertigo)",
      eye_redness_discharge: "Eye Redness, Grittiness & Discharge (Pink Eye)",
      vision_sudden_loss: "Sudden Vision Loss or Flashes of Light",
      eye_pain_severe: "Severe Deep Eye Pain with Halos Around Lights",
      sore_throat_fever: "Sore Throat with Pain on Swallowing",
      ear_pain_discharge: "Ear Pain, Blockage or Ringing (Tinnitus)",
      nasal_congestion_sinus_pressure: "Sinus Pressure, Facial Pain & Congestion",
      persistent_cough_wheezing: "Persistent Cough with Wheezing or Phlegm",
      heart_palpitations: "Heart Palpitations / Racing or Skipping Heartbeats",
      burning_chest_reflux: "Burning Sensation Behind Breastbone (Heartburn / Reflux)",
      severe_rigid_abdominal_pain: "Sudden Severe Abdominal Pain with Rigid Hard Belly",
      vomiting_blood_black_stools: "Vomiting Blood or Passing Dark Tar-Like Black Stools",
      cramping_bloating_diarrhea: "Abdominal Cramping, Bloating & Watery Diarrhea",
      yellowing_skin_jaundice: "Yellowing of Eyes/Skin (Jaundice) & Dark Urine",
      lower_back_pain_muscle: "Lower Back Aching or Muscle Spasm",
      back_pain_numbness_bladder: "Severe Back Pain with Leg Numbness & Loss of Bladder Control",
      shooting_leg_pain_sciatica: "Shooting Nerve Pain Down One Leg (Sciatica)",
      knee_joint_swelling_pain: "Knee / Joint Pain with Stiffness & Swelling",
      symmetric_joint_morning_stiffness: "Symmetric Joint Pain & Morning Stiffness > 1 Hour",
      sudden_swollen_hot_big_toe: "Excruciating Hot, Red, Swollen Big Toe Joint (Gout)",
      itchy_rash_eczema: "Dry, Red, Scaling or Itchy Skin Patches",
      anaphylaxis_hives_lip_swelling: "Rapid Spreading Hives with Swelling of Lips or Throat",
      unusual_changing_mole: "Irregular, Changing or Bleeding Skin Mole",
      fever_mild_body_aches: "Fever with Generalized Body Aches & Chills",
      fever_stiff_neck_confusion: "High Fever with Stiff Neck, Confusion or Lethargy",
      chronic_fatigue_weight_loss: "Unexplained Significant Weight Loss & Exhaustion",
      frequent_painful_urination: "Painful, Burning Urination with Pelvic Aching"
    },
    te: {
      chest_pain_crushing: "తీవ్రమైన ఛాతీ నొప్పి / ఎడమ చేతికి లేదా దవడకు పాకే నొప్పి",
      facial_droop_speech: "ముఖం వంకరపోవడం, చేయి బలహీనపడటం, మాట ముద్దరావడం (FAST)",
      shortness_of_breath_severe: "తీవ్రమైన శ్వాస ఆడకపోవడం / విశ్రాంతిలో కూడా ఆయాసం",
      headache_throbbing: "ఒకవైపు తీవ్రమైన తలనొప్పి / మైగ్రేన్ నొప్పి",
      headache_thunderclap: "ఉరుములాంటి ఆకస్మిక తీవ్రమైన తలనొప్పి",
      dizziness_vertigo: "తలతిరగడం / గది గిర్రున తిరుగుతున్న భావన (వెర్టిగో)",
      eye_redness_discharge: "కళ్ళు ఎర్రబడటం, గుచ్చుకోవడం & చీము కారడం",
      vision_sudden_loss: "ఆకస్మిక దృష్టి లోపం లేదా వెలుగు మెరుపులు కనిపించడం",
      eye_pain_severe: "కంటిలోపల తీవ్రమైన నొప్పి & లైట్ల చుట్టూ ఇంద్రధనుస్సు వలయాలు",
      sore_throat_fever: "గొంతు నొప్పి & ఆహారం మింగేటప్పుడు తీవ్రమైన నొప్పి",
      ear_pain_discharge: "చెవి నొప్పి, చెవి మూసుకుపోవడం లేదా రింగింగ్ శబ్దం",
      nasal_congestion_sinus_pressure: "సైనస్ ఒత్తిడి, ముఖం నొప్పి & ముక్కు దిబ్బడ",
      persistent_cough_wheezing: "ఎడతెగని దగ్గు, పిల్లికూతలు లేదా కఫం",
      heart_palpitations: "గుండె దడ / వేగంగా లేదా అస్థిరంగా కొట్టుకోవడం",
      burning_chest_reflux: "ఛాతీలో మంట / అసిడిటీ లేదా గ్యాస్ట్రిక్ రిఫ్లక్స్",
      severe_rigid_abdominal_pain: "కడుపు గట్టిపడటం మరియు తీవ్రమైన భరించలేని కడుపు నొప్పి",
      vomiting_blood_black_stools: "రక్తం వాంతులు కావడం లేదా నల్లటి మల విసర్జన",
      cramping_bloating_diarrhea: "కడుపులో తిప్పడం, ఉబ్బరం & నీళ్ళ విరేచనాలు",
      yellowing_skin_jaundice: "కళ్ళు/చర్మం పచ్చబడటం (కామెర్లు) & ముదురు రంగు మూత్రం",
      lower_back_pain_muscle: "నడుము నొప్పి లేదా వెన్ను కండరాల పట్టేయడం",
      back_pain_numbness_bladder: "నడుము నొప్పితో పాటు కాళ్ళ తిమ్మిరి & మూత్ర విసర్జనపై నియంత్రణ కోల్పోవడం",
      shooting_leg_pain_sciatica: "నడుము నుండి కాలి వరకు పాకే తీవ్రమైన నరాల నొప్పి (సయాటికా)",
      knee_joint_swelling_pain: "మోకాలి నొప్పి, బిగుతు & కీళ్ల వాపు",
      symmetric_joint_morning_stiffness: "రెండు చేతుల కీళ్ల నొప్పి & ఉదయం 1 గంటకు పైగా కీళ్ళు పట్టేయడం",
      sudden_swollen_hot_big_toe: "కాలి బొటనవేలు కీలు ఎర్రబడి తీవ్రంగా వాచి భరించలేని నొప్పి (గౌట్)",
      itchy_rash_eczema: "చర్మంపై పొడిబారిన ఎర్రటి దద్దుర్లు లేదా దురద",
      anaphylaxis_hives_lip_swelling: "వేగంగా వ్యాపించే దద్దుర్లు మరియు పెదవులు/గొంతు వాపు",
      unusual_changing_mole: "రంగు లేదా పరిమాణం మారుతున్న అనుమానాస్పద పుట్టుమచ్చ",
      fever_mild_body_aches: "జ్వరం, ఒళ్ళు నొప్పులు మరియు చలి",
      fever_stiff_neck_confusion: "తీవ్రమైన జ్వరం, మెడ బిగుతు మరియు గందరగోళం",
      chronic_fatigue_weight_loss: "కారణం లేకుండా బరువు తగ్గడం & విపరీతమైన అలసట",
      frequent_painful_urination: "మూత్ర విసర్జన సమయంలో మంట మరియు కటి నొప్పి"
    },
    hi: {
      chest_pain_crushing: "छाती में अत्यधिक भारीपन व असहनीय दर्द जो बाएं हाथ या जबड़े तक फैले",
      facial_droop_speech: "चेहरे का एक तरफ झुकना, बांह में कमजोरी, बोलने में लड़खड़ाहट (FAST)",
      shortness_of_breath_severe: "सांस लेने में अत्यधिक कठिनाई / बैठे रहने पर भी हांफना",
      headache_throbbing: "सिर के एक तरफ धड़कता हुआ तेज सिरदर्द (माइग्रेन)",
      headache_thunderclap: "बिजली कड़कने जैसा अचानक असहनीय तेज सिरदर्द",
      dizziness_vertigo: "सिर चकराना / कमरा घूमता हुआ महसूस होना (वर्टिगो)",
      eye_redness_discharge: "आंखों में लाली, जलन, कीचड़ आना (आंख आना)",
      vision_sudden_loss: "अचानक आंखों की रोशनी जाना या चमकती रोशनी दिखना",
      eye_pain_severe: "आंख में गहरा असहनीय दर्द और रोशनी के चारों ओर इंद्रधनुषी घेरे",
      sore_throat_fever: "गले में तेज दर्द और निगलने में कठिनाई",
      ear_pain_discharge: "कान में दर्द, कान बंद होना या सीटी जैसी आवाज आना",
      nasal_congestion_sinus_pressure: "साइनस का दबाव, चेहरे पर भारीपन व नाक बंद होना",
      persistent_cough_wheezing: "लगातार 2 हफ्ते से अधिक खांसी, सीटी की आवाज या बलगम",
      heart_palpitations: "दिल की असामान्य तेज धड़कन / दिल बैठना",
      burning_chest_reflux: "छाती के बीच में तेज जलन (सीने में जलन / एसिडिटी)",
      severe_rigid_abdominal_pain: "पेट का पत्थर जैसा कड़ा होना और असहनीय पेट दर्द",
      vomiting_blood_black_stools: "खून की उल्टी होना या काले तारकोल जैसा मल आना",
      cramping_bloating_diarrhea: "पेट में मरोड़, पेट फूलना और पतला दस्त",
      yellowing_skin_jaundice: "आंखों या त्वचा का पीला पड़ना (पीलिया) व गहरा पेशाब",
      lower_back_pain_muscle: "कमर के निचले हिस्से में दर्द या मांसपेशियों में अकड़न",
      back_pain_numbness_bladder: "कमर दर्द के साथ पैरों का सुन्न होना और पेशाब पर नियंत्रण न रहना",
      shooting_leg_pain_sciatica: "कमर से पैर के नीचे तक बिजली जैसा खिंचने वाला दर्द (साइटिका)",
      knee_joint_swelling_pain: "घुटनों व जोड़ों में दर्द, अकड़न और सूजन",
      symmetric_joint_morning_stiffness: "दोनों हाथों के जोड़ों में दर्द व सुबह 1 घंटे से अधिक अकड़न",
      sudden_swollen_hot_big_toe: "पैर के अंगूठे के जोड़ में अचानक लालिमा, सूजन और भयंकर दर्द (गाउट)",
      itchy_rash_eczema: "त्वचा पर सूखे लाल चकत्ते, पपड़ीदार त्वचा या तेज खुजली",
      anaphylaxis_hives_lip_swelling: "अचानक तेजी से फैलते पित्ती/चकत्ते और होंठ या गले में सूजन",
      unusual_changing_mole: "रंग, आकार बदलने वाला या खून बहने वाला तिल/मस्सा",
      fever_mild_body_aches: "बुखार के साथ पूरे शरीर में दर्द, कंपकंपी व थकान",
      fever_stiff_neck_confusion: "तेज बुखार के साथ गर्दन में अकड़न और मानसिक भ्रम",
      chronic_fatigue_weight_loss: "बिना किसी कारण के तेजी से वजन घटना और अत्यधिक कमजोरी",
      frequent_painful_urination: "पेशाब में तेज जलन, बार-बार पेशाब आना और पेडू में दर्द"
    }
  },

  t(key) {
    const langDict = this.translations[this.currentLang] || this.translations.en;
    return langDict[key] || this.translations.en[key] || key;
  },

  getSymptomName(slug) {
    const langSyms = this.symptomsI18n[this.currentLang] || this.symptomsI18n.en;
    return langSyms[slug] || this.symptomsI18n.en[slug] || slug;
  },

  getSpecialtyName(slug) {
    const langSpecs = this.specialtiesI18n[this.currentLang] || this.specialtiesI18n.en;
    return langSpecs[slug] || this.specialtiesI18n.en[slug] || slug;
  },

  getBodyPartName(slug) {
    const langParts = this.bodyPartsI18n[this.currentLang] || this.bodyPartsI18n.en;
    return langParts[slug] || this.bodyPartsI18n.en[slug] || slug;
  },

  setLanguage(lang) {
    if (!['en', 'te', 'hi'].includes(lang)) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('mediguide-lang', lang);
    document.documentElement.lang = lang;

    // Apply font family adjustments for Indic scripts
    if (lang === 'te') {
      document.body.style.fontFamily = "'Noto Sans Telugu', 'Plus Jakarta Sans', system-ui, sans-serif";
    } else if (lang === 'hi') {
      document.body.style.fontFamily = "'Noto Sans Devanagari', 'Plus Jakarta Sans', system-ui, sans-serif";
    } else {
      document.body.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
    }

    this.updateDomTranslations();

    // Trigger re-render of dynamic components
    if (window.bodyDiagramController) {
      window.bodyDiagramController.renderPartPills();
      window.bodyDiagramController.selectPart(window.bodyDiagramController.selectedPart);
    }
    if (window.symptomFormController) {
      window.symptomFormController.filterAndRenderSymptoms();
    }
    if (window.doctorFinderController) {
      window.doctorFinderController.populateSpecialtyDropdown();
    }
  },

  updateDomTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update language button active classes
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }
};

window.I18N = I18N;
