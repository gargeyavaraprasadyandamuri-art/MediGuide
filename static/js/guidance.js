/**
 * MediGuide — Care Guidance & Triage Controller
 * Displays transparent rule-based medical navigation, emergency alerts,
 * clinical rationale, appointment checklist, and triggers doctor discovery.
 */

class GuidanceController {
  constructor() {
    this.section = document.getElementById('care-guidance-section');
    this.emergencyBox = document.getElementById('guidance-emergency-box');
    this.triageBanner = document.getElementById('guidance-triage-banner');
    this.specialtyCard = document.getElementById('guidance-specialty-card');
    this.reasoningTimeline = document.getElementById('guidance-reasoning-timeline');
    this.checklistContainer = document.getElementById('guidance-checklist-container');
    this.printBtn = document.getElementById('btn-print-summary');

    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const reasoningToggle = document.getElementById('reasoning-header-toggle');
    const reasoningContent = document.getElementById('reasoning-content');
    if (reasoningToggle && reasoningContent) {
      reasoningToggle.addEventListener('click', () => {
        reasoningContent.style.display = reasoningContent.style.display === 'none' ? 'block' : 'none';
      });
    }
  }

  renderResults(data) {
    if (!this.section) return;

    this.section.classList.add('show');
    this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const isEmergency = data.triage_level === 'EMERGENCY';

    // 1. Emergency Warning Box
    if (isEmergency) {
      this.emergencyBox.style.display = 'block';
      this.emergencyBox.innerHTML = `
        <div class="emergency-alert-card">
          <div class="emergency-alert-header">
            <div class="emergency-icon-pulse">🚨</div>
            <div>
              <h3 class="emergency-alert-title">URGENT MEDICAL WARNING</h3>
              <p style="color: #fee2e2; margin-top: 0.25rem;">
                One or more critical safety red flags were detected. Outpatient clinic visits are NOT recommended.
              </p>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.2); border-radius: var(--radius-md); padding: 1.15rem; margin-top: 1rem;">
            <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.05rem;">Detected Warning Signs:</strong>
            <ul style="padding-left: 1.25rem; line-height: 1.6;">
              ${data.emergency_flags.map(ef => `<li><strong>${ef.title}</strong> — ${ef.description}</li>`).join('')}
            </ul>
          </div>

          <div class="emergency-alert-actions">
            <a href="tel:112" class="btn-emergency-call">
              📞 Call Emergency 112 (National / Ambulance)
            </a>
            <a href="tel:911" class="btn-emergency-call" style="background: rgba(255,255,255,0.25); color: #fff;">
              📞 Call 911 (US)
            </a>
            <button class="btn btn-outline" style="background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.4);" onclick="window.doctorFinderController.filterEmergencyHospitals()">
              🏥 Locate Nearest Emergency Room
            </button>
          </div>
        </div>
      `;
    } else {
      this.emergencyBox.style.display = 'none';
    }

    // 2. Triage Banner
    const badge = data.triage_badge || { label: data.triage_level, color: 'primary' };
    this.triageBanner.innerHTML = `
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--slate-500); display: block; margin-bottom: 0.25rem;">
          Clinical Navigation Assessment
        </span>
        <h3 style="font-size: 1.4rem; color: var(--slate-900);">
          Recommended Pathway: ${data.recommended_specialty ? data.recommended_specialty.name : 'Specialist Consultation'}
        </h3>
      </div>
      <div class="triage-badge ${badge.color}">
        ${badge.label}
      </div>
    `;

    // 3. Recommended Specialty Card
    const spec = data.recommended_specialty || {};
    const secSpec = data.secondary_specialty;
    const localizedSpecName = window.I18N ? window.I18N.getSpecialtyName(spec.slug) : spec.name;
    const localizedSecSpecName = secSpec ? (window.I18N ? window.I18N.getSpecialtyName(secSpec.slug) : secSpec.name) : '';
    const localizedSymName = data.primary_symptom ? (window.I18N ? window.I18N.getSymptomName(data.primary_symptom.slug) : data.primary_symptom.name) : '';
    const findDocsBtnText = window.I18N ? window.I18N.t('find_matching_docs') : 'Find Matching Doctors Nearby';

    this.specialtyCard.innerHTML = `
      <div class="specialty-hero-header">
        <div class="specialty-icon-box">
          ${this.getSpecialtyIcon(spec.slug)}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <h2 class="specialty-name">${localizedSpecName}</h2>
            <span class="specialty-category">${spec.category || 'Specialist'}</span>
          </div>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.4rem; line-height: 1.6;">
            ${spec.description || ''}
          </p>
        </div>
      </div>

      <div class="guidance-details-grid">
        <div class="guidance-block">
          <h5>🎯 What This Specialist Does</h5>
          <p>${spec.what_they_do || 'Performs in-depth clinical diagnosis and specialized therapy for this organ system.'}</p>
        </div>

        <div class="guidance-block">
          <h5>🔬 Typical Evaluations & Tests to Expect</h5>
          <p>${spec.typical_evaluations || 'Baseline diagnostic blood tests, targeted physical exams, and organ-specific scans.'}</p>
        </div>

        ${secSpec ? `
        <div class="guidance-block" style="background: var(--primary-light); border-color: rgba(2, 132, 199, 0.2);">
          <h5 style="color: var(--neon-cyan);">💡 Alternative / Initial First Step</h5>
          <p style="color: var(--text-main);">
            You can also begin with a <strong>${localizedSecSpecName}</strong> for initial physical evaluation, routine vitals check, and formal referral.
          </p>
        </div>
        ` : ''}
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <div style="font-size: 0.85rem; color: var(--text-dim);">
          Primary Symptom Evaluated: <strong style="color: var(--neon-cyan);">${localizedSymName}</strong>
        </div>
        <button class="btn btn-primary" onclick="window.doctorFinderController.scrollToDoctors('${spec.slug}')">
          📍 ${findDocsBtnText}
        </button>
      </div>
    `;

    // 4. Clinical Diagnostic Pathway Node Flow
    const pathwayContainer = document.getElementById('guidance-pathway-container');
    if (pathwayContainer) {
      pathwayContainer.innerHTML = `
        <div class="care-pathway-flow">
          <h4 class="pathway-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Transparent Clinical Navigation Flow
          </h4>
          <div class="pathway-steps-container">
            <div class="pathway-step-node">
              <span class="node-tag">01. Your Symptom</span>
              <div class="node-value">${data.primary_symptom ? data.primary_symptom.name : 'Reported Symptom'}</div>
            </div>
            <span class="pathway-arrow">➔</span>
            <div class="pathway-step-node">
              <span class="node-tag">02. Rule Evaluated</span>
              <div class="node-value">${data.triage_level.replace(/_/g, ' ')}</div>
            </div>
            <span class="pathway-arrow">➔</span>
            <div class="pathway-step-node" style="border-color: var(--neon-cyan); box-shadow: 0 0 14px var(--neon-cyan-glow);">
              <span class="node-tag" style="color: var(--neon-cyan);">03. Suggested Specialty</span>
              <div class="node-value" style="color: var(--neon-cyan);">${spec.name || 'Medical Specialist'}</div>
            </div>
            <span class="pathway-arrow">➔</span>
            <div class="pathway-step-node">
              <span class="node-tag">04. First Test / Scan</span>
              <div class="node-value">${(spec.typical_evaluations || 'Clinical Exam').split(',')[0]}</div>
            </div>
          </div>
        </div>
      `;
    }

    // 5. Digital Healthcare Referral Passport Slip
    const passportContainer = document.getElementById('guidance-passport-container');
    if (passportContainer) {
      const passId = 'MG-' + Math.floor(100000 + Math.random() * 900000);
      const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      passportContainer.innerHTML = `
        <div class="referral-passport-card">
          <div class="passport-badge-header">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); text-transform: uppercase; letter-spacing: 1px;">
                MediGuide Digital Triage Referral Pass
              </span>
              <h3 style="font-size: 1.5rem; color: var(--text-heading); margin-top: 0.2rem;">
                ${spec.name || 'Medical Specialist'}
              </h3>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="text-align: right;">
                <div style="font-family: var(--font-mono); font-weight: 800; font-size: 1.1rem; color: var(--neon-cyan);">${passId}</div>
                <div style="font-size: 0.75rem; color: var(--text-dim);">${todayDate}</div>
              </div>
              <div class="passport-qr-sim" title="Simulated Verification Code">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#070b14" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; font-size: 0.88rem;">
            <div>
              <span style="color: var(--text-dim); font-size: 0.78rem; text-transform: uppercase;">Primary Symptom:</span>
              <div style="font-weight: 700; color: var(--text-heading);">${data.primary_symptom ? data.primary_symptom.name : ''}</div>
            </div>
            <div>
              <span style="color: var(--text-dim); font-size: 0.78rem; text-transform: uppercase;">Urgency Status:</span>
              <div style="font-weight: 800; color: ${isEmergency ? 'var(--danger)' : 'var(--neon-cyan)'};">${data.triage_level.replace(/_/g, ' ')}</div>
            </div>
            <div>
              <span style="color: var(--text-dim); font-size: 0.78rem; text-transform: uppercase;">Clinical Rationale:</span>
              <div style="font-weight: 600; color: var(--text-muted);">${(spec.what_they_do || '').slice(0, 75)}...</div>
            </div>
          </div>
        </div>
      `;
    }

    // 6. Transparent Reasoning Timeline
    if (this.reasoningTimeline && data.reasoning_steps) {
      this.reasoningTimeline.innerHTML = data.reasoning_steps.map((step, idx) => `
        <div class="reasoning-step-item">
          <div class="step-number">${idx + 1}</div>
          <div class="step-content">
            <strong>${step.phase}</strong>
            <p>${step.detail}</p>
          </div>
        </div>
      `).join('');
    }

    // 7. Preparation Checklist
    if (this.checklistContainer && data.preparation_checklist) {
      this.checklistContainer.innerHTML = `
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          📋 Doctor Appointment Preparation Checklist
        </h4>
        <ul class="checklist-items-list">
          ${data.preparation_checklist.map(item => `
            <li class="checklist-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      `;
    }

    // Audio & ECG feedback
    if (isEmergency) {
      window.soundSynthesizer?.playEmergencyAlert();
      window.ecgMonitor?.setRate(130);
    } else {
      window.soundSynthesizer?.playChime(880);
      window.ecgMonitor?.setRate(75);
    }

    // Synchronize Doctor Finder
    if (window.doctorFinderController) {
      const targetSpecialty = isEmergency ? 'all' : (spec.slug || 'all');
      window.doctorFinderController.loadDoctors(targetSpecialty);
    }
  }

  getSpecialtyIcon(slug) {
    const icons = {
      cardiologist: '❤️',
      neurologist: '🧠',
      pulmonologist: '🫁',
      gastroenterologist: '🥣',
      dermatologist: '🧴',
      orthopedist: '🦴',
      ent_specialist: '👂',
      ophthalmologist: '👁️',
      general_physician: '🩺',
      rheumatologist: '🛡️',
      psychiatrist: '🧠',
      urologist: '💧',
      emergency_medicine: '🚨'
    };
    return icons[slug] || '🩺';
  }
}

window.GuidanceController = GuidanceController;
