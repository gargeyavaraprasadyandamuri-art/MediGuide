/**
 * MediGuide — Biometric Hologram Body Scanner Controller
 * Supports Front & Back anatomical views, glowing laser scanning beam,
 * Organ Systems filter, pulsing vital telemetry nodes, and audio chimes.
 */

class BodyDiagramController {
  constructor() {
    this.currentView = 'front';
    this.selectedPart = 'all';
    this.selectedSystem = 'all';
    this.svgContainer = document.getElementById('body-svg-container');
    this.tooltip = document.getElementById('body-zone-tooltip');
    this.areaTitleEl = document.getElementById('selected-area-title');
    this.areaDescEl = document.getElementById('selected-area-desc');
    this.areaIconEl = document.getElementById('selected-area-icon');
    this.pillsContainer = document.getElementById('body-pills-row');
    this.systemsContainer = document.getElementById('organ-systems-nav');

    this.partMetadata = {
      all: { name: 'Full Body Telemetry Scan', desc: 'Scan active across all biological organ systems', icon: '⚡' },
      head: { name: 'Cranial & Neural Cortex', desc: 'Cerebral pathways, migraines, tension, and neurovascular signs', icon: '🧠' },
      eyes: { name: 'Ophthalmic & Visual Field', desc: 'Ocular pressure, visual disturbances, redness, and acute eye pain', icon: '👁️' },
      ent: { name: 'Otolaryngology (ENT)', desc: 'Sinus cavities, auditory canals, vestibular balance, and pharynx', icon: '👂' },
      neck: { name: 'Cervical Spine & Lymphatics', desc: 'Cervical vertebrae, thyroid gland, and lymphatic nodes', icon: '🧣' },
      chest: { name: 'Cardiopulmonary Complex', desc: 'Myocardial circulation, pericardium, bronchi, and pulmonary alveoli', icon: '🫁' },
      abdomen: { name: 'Gastrointestinal Matrix', desc: 'Gastric mucosa, hepatic biliary tract, pancreas, and bowel tract', icon: '🥣' },
      back: { name: 'Dorsal Spine & Lumbar Axis', desc: 'Thoracic & lumbar vertebrae, sciatica roots, and paraspinal muscles', icon: '🦴' },
      joints: { name: 'Articular Musculoskeletal', desc: 'Synovial joints, ligaments, cartilage wear, knee & shoulder mobility', icon: '🦵' },
      skin: { name: 'Cutaneous Integumentary', desc: 'Dermal layers, acute hives, rash morphology, and atypical lesions', icon: '🧴' },
      general: { name: 'Systemic / Constitutional', desc: 'Metabolic balance, immune pyrexia, chills, fatigue, and vitals', icon: '🌡️' }
    };

    this.systemMappings = {
      all: ['head', 'eyes', 'ent', 'neck', 'chest', 'abdomen', 'back', 'joints', 'skin', 'general'],
      neuro: ['head', 'eyes', 'neck'],
      cardio: ['chest'],
      gastro: ['abdomen'],
      ortho: ['joints', 'back'],
      derma: ['skin']
    };

    this.init();
  }

  init() {
    this.renderSystemTabs();
    this.renderDiagram(this.currentView);
    this.setupViewToggles();
    this.renderPartPills();
  }

  renderSystemTabs() {
    if (!this.systemsContainer) return;
    const t = (k) => window.I18N ? window.I18N.t(k) : k;
    this.systemsContainer.innerHTML = `
      <button type="button" class="system-tab-btn active" data-system="all">${t('sys_all')}</button>
      <button type="button" class="system-tab-btn" data-system="neuro">${t('sys_neuro')}</button>
      <button type="button" class="system-tab-btn" data-system="cardio">${t('sys_cardio')}</button>
      <button type="button" class="system-tab-btn" data-system="gastro">${t('sys_gastro')}</button>
      <button type="button" class="system-tab-btn" data-system="ortho">${t('sys_ortho')}</button>
      <button type="button" class="system-tab-btn" data-system="derma">${t('sys_derma')}</button>
    `;

    const tabs = this.systemsContainer.querySelectorAll('.system-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        this.filterBySystem(btn.dataset.system);
      });
    });
  }

  filterBySystem(systemKey) {
    this.selectedSystem = systemKey;
    const allowedParts = this.systemMappings[systemKey] || this.systemMappings.all;

    // Highlight or dim SVG regions
    const regions = this.svgContainer.querySelectorAll('.body-region, .vital-node');
    regions.forEach(el => {
      const region = el.dataset.region;
      if (allowedParts.includes(region)) {
        el.style.opacity = '1';
        el.style.pointerEvents = 'all';
      } else {
        el.style.opacity = '0.2';
        el.style.pointerEvents = 'none';
      }
    });

    if (systemKey !== 'all' && allowedParts.length > 0) {
      this.selectPart(allowedParts[0]);
    } else {
      this.selectPart('all');
    }
  }

  setupViewToggles() {
    const btnFront = document.getElementById('btn-view-front');
    const btnBack = document.getElementById('btn-view-back');

    if (btnFront && btnBack) {
      btnFront.addEventListener('click', () => {
        this.currentView = 'front';
        btnFront.classList.add('active');
        btnBack.classList.remove('active');
        this.renderDiagram('front');
        window.soundSynthesizer?.playChime(640);
      });

      btnBack.addEventListener('click', () => {
        this.currentView = 'back';
        btnBack.classList.add('active');
        btnFront.classList.remove('active');
        this.renderDiagram('back');
        window.soundSynthesizer?.playChime(520);
      });
    }
  }

  renderPartPills() {
    if (!this.pillsContainer) return;
    this.pillsContainer.innerHTML = '';

    const parts = [
      { slug: 'all', defaultName: 'All Areas' },
      { slug: 'head', defaultName: 'Head' },
      { slug: 'eyes', defaultName: 'Eyes' },
      { slug: 'ent', defaultName: 'ENT' },
      { slug: 'neck', defaultName: 'Neck' },
      { slug: 'chest', defaultName: 'Chest' },
      { slug: 'abdomen', defaultName: 'Abdomen' },
      { slug: 'back', defaultName: 'Back' },
      { slug: 'joints', defaultName: 'Joints' },
      { slug: 'skin', defaultName: 'Skin' },
      { slug: 'general', defaultName: 'Whole Body' }
    ];

    parts.forEach(p => {
      const btn = document.createElement('button');
      btn.className = `part-pill-btn ${this.selectedPart === p.slug ? 'active' : ''}`;
      btn.dataset.part = p.slug;
      const localizedName = window.I18N ? window.I18N.getBodyPartName(p.slug) : p.defaultName;
      btn.innerHTML = `${this.partMetadata[p.slug]?.icon || ''} ${localizedName}`;
      btn.addEventListener('click', () => {
        this.selectPart(p.slug);
      });
      this.pillsContainer.appendChild(btn);
    });
  }

  renderDiagram(view) {
    if (!this.svgContainer) return;

    if (view === 'front') {
      this.svgContainer.innerHTML = `
        <svg class="body-svg" viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg">
          <!-- Holographic Scanning Guide Lines -->
          <defs>
            <linearGradient id="holoGlowFront" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2"/>
            </linearGradient>
          </defs>

          <!-- Anatomical Silhouette Base (Front) -->
          <g class="body-silhouette-base">
            <ellipse cx="150" cy="55" rx="35" ry="42" />
            <path d="M138 94 L138 120 L162 120 L162 94 Z" />
            <path d="M100 120 C100 120, 95 190, 110 240 C118 268, 120 280, 150 280 C180 280, 182 268, 190 240 C205 190, 200 120, 200 120 Z" />
            <path d="M110 278 L122 335 L178 335 L190 278 Z" />
            <path d="M100 122 C85 145, 70 190, 68 235 C66 265, 60 305, 54 325 C50 338, 45 350, 48 358 C52 364, 60 360, 64 345 C72 315, 80 275, 84 235 C88 200, 102 150, 108 135 Z" />
            <path d="M200 122 C215 145, 230 190, 232 235 C234 265, 240 305, 246 325 C250 338, 255 350, 252 358 C248 364, 240 360, 236 345 C228 315, 220 275, 216 235 C212 200, 198 150, 192 135 Z" />
            <path d="M122 335 C118 380, 115 435, 118 465 C120 495, 116 525, 112 545 C110 552, 116 556, 126 556 C136 556, 138 548, 138 535 C138 505, 142 460, 145 425 C148 390, 148 340, 148 335 Z" />
            <path d="M178 335 C182 380, 185 435, 182 465 C180 495, 184 525, 188 545 C190 552, 184 556, 174 556 C164 556, 162 548, 162 535 C162 505, 158 460, 155 425 C152 390, 152 340, 152 335 Z" />
          </g>

          <!-- Interactive Hotspot Zones -->
          <!-- Head / Brain Cortex -->
          <ellipse class="body-region ${this.selectedPart === 'head' ? 'active-selected' : ''}" 
                   data-region="head" cx="150" cy="40" rx="30" ry="24" />

          <!-- Eyes & Vision -->
          <ellipse class="body-region ${this.selectedPart === 'eyes' ? 'active-selected' : ''}" 
                   data-region="eyes" cx="150" cy="58" rx="22" ry="9" />

          <!-- ENT / Throat -->
          <ellipse class="body-region ${this.selectedPart === 'ent' ? 'active-selected' : ''}" 
                   data-region="ent" cx="150" cy="76" rx="18" ry="10" />

          <!-- Neck -->
          <rect class="body-region ${this.selectedPart === 'neck' ? 'active-selected' : ''}" 
                data-region="neck" x="135" y="94" width="30" height="24" rx="6" />

          <!-- Chest (Cardiopulmonary) -->
          <path class="body-region ${this.selectedPart === 'chest' ? 'active-selected' : ''}" 
                data-region="chest" d="M106 122 C115 120, 185 120, 194 122 C200 150, 198 175, 192 195 C170 198, 130 198, 108 195 C102 175, 100 150, 106 122 Z" />

          <!-- Abdomen (Gastrointestinal) -->
          <path class="body-region ${this.selectedPart === 'abdomen' ? 'active-selected' : ''}" 
                data-region="abdomen" d="M108 200 C130 200, 170 200, 192 200 C190 235, 185 272, 175 285 C160 288, 140 288, 125 285 C115 272, 110 235, 108 200 Z" />

          <!-- Joints: Shoulders -->
          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="95" cy="132" r="14" />
          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="205" cy="132" r="14" />

          <!-- Joints: Knees -->
          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="127" cy="455" r="16" />
          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="173" cy="455" r="16" />

          <!-- Pulsing Vital Telemetry Nodes -->
          <!-- Heart Node -->
          <g class="vital-node" data-region="chest" transform="translate(142, 155)">
            <circle class="ping" cx="0" cy="0" r="10" />
            <circle class="core" cx="0" cy="0" r="5" fill="#f43f5e" />
          </g>

          <!-- Brain Node -->
          <g class="vital-node" data-region="head" transform="translate(150, 36)">
            <circle class="ping" cx="0" cy="0" r="10" />
            <circle class="core" cx="0" cy="0" r="4" fill="#00f2fe" />
          </g>

          <!-- Stomach Node -->
          <g class="vital-node" data-region="abdomen" transform="translate(150, 230)">
            <circle class="ping" cx="0" cy="0" r="10" />
            <circle class="core" cx="0" cy="0" r="4" fill="#14b8a6" />
          </g>

          <!-- Skin Tag -->
          <g class="body-region ${this.selectedPart === 'skin' ? 'active-selected' : ''}" data-region="skin" transform="translate(236, 260)">
            <rect x="0" y="0" width="52" height="26" rx="13" fill="rgba(0, 242, 254, 0.15)" stroke="#00f2fe" stroke-width="1.5" />
            <text x="26" y="17" text-anchor="middle" font-size="11" font-weight="800" fill="#00f2fe">SKIN</text>
          </g>
        </svg>
      `;
    } else {
      // Back View
      this.svgContainer.innerHTML = `
        <svg class="body-svg" viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg">
          <!-- Anatomical Silhouette Base (Back) -->
          <g class="body-silhouette-base">
            <ellipse cx="150" cy="55" rx="35" ry="42" />
            <path d="M138 94 L138 120 L162 120 L162 94 Z" />
            <path d="M100 120 C100 120, 95 190, 110 240 C118 268, 120 280, 150 280 C180 280, 182 268, 190 240 C205 190, 200 120, 200 120 Z" />
            <path d="M110 278 C115 315, 120 338, 150 338 C180 338, 185 315, 190 278 Z" />
            <path d="M100 122 C85 145, 70 190, 68 235 C66 265, 60 305, 54 325 C50 338, 45 350, 48 358 C52 364, 60 360, 64 345 C72 315, 80 275, 84 235 C88 200, 102 150, 108 135 Z" />
            <path d="M200 122 C215 145, 230 190, 232 235 C234 265, 240 305, 246 325 C250 338, 255 350, 252 358 C248 364, 240 360, 236 345 C228 315, 220 275, 216 235 C212 200, 198 150, 192 135 Z" />
            <path d="M122 335 C118 380, 115 435, 118 465 C120 495, 116 525, 112 545 C110 552, 116 556, 126 556 C136 556, 138 548, 138 535 C138 505, 142 460, 145 425 C148 390, 148 340, 148 335 Z" />
            <path d="M178 335 C182 380, 185 435, 182 465 C180 495, 184 525, 188 545 C190 552, 184 556, 174 556 C164 556, 162 548, 162 535 C162 505, 158 460, 155 425 C152 390, 152 340, 152 335 Z" />
            <!-- Glowing Vertebral Spine Axis -->
            <line x1="150" y1="100" x2="150" y2="300" stroke="#00f2fe" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.75" />
          </g>

          <!-- Hotspots (Back) -->
          <ellipse class="body-region ${this.selectedPart === 'head' ? 'active-selected' : ''}" 
                   data-region="head" cx="150" cy="50" rx="30" ry="28" />

          <rect class="body-region ${this.selectedPart === 'neck' ? 'active-selected' : ''}" 
                data-region="neck" x="135" y="95" width="30" height="24" rx="6" />

          <path class="body-region ${this.selectedPart === 'back' ? 'active-selected' : ''}" 
                data-region="back" d="M106 125 C120 122, 180 122, 194 125 C198 160, 196 185, 188 200 C165 204, 135 204, 112 200 C104 185, 102 160, 106 125 Z" />

          <path class="body-region ${this.selectedPart === 'back' ? 'active-selected' : ''}" 
                data-region="back" d="M112 205 C135 205, 165 205, 188 205 C185 240, 180 270, 172 280 C160 284, 140 284, 128 280 C120 270, 115 240, 112 205 Z" />

          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="95" cy="132" r="14" />
          <circle class="body-region ${this.selectedPart === 'joints' ? 'active-selected' : ''}" 
                  data-region="joints" cx="205" cy="132" r="14" />

          <path class="body-region ${this.selectedPart === 'back' ? 'active-selected' : ''}" 
                data-region="back" d="M118 340 L128 470 L142 470 L146 340 Z" />
          <path class="body-region ${this.selectedPart === 'back' ? 'active-selected' : ''}" 
                data-region="back" d="M182 340 L172 470 L158 470 L154 340 Z" />

          <!-- Lumbar Spine Vital Node -->
          <g class="vital-node" data-region="back" transform="translate(150, 240)">
            <circle class="ping" cx="0" cy="0" r="10" />
            <circle class="core" cx="0" cy="0" r="4" fill="#00f2fe" />
          </g>
        </svg>
      `;
    }

    this.attachSvgEvents();
  }

  attachSvgEvents() {
    const targets = this.svgContainer.querySelectorAll('.body-region, .vital-node');
    targets.forEach(el => {
      const regionName = el.dataset.region;

      el.addEventListener('mouseenter', (e) => {
        this.showTooltip(regionName, e);
      });

      el.addEventListener('mousemove', (e) => {
        this.moveTooltip(e);
      });

      el.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });

      el.addEventListener('click', () => {
        this.selectPart(regionName);
        window.soundSynthesizer?.playChime(780);
      });
    });
  }

  showTooltip(regionName, e) {
    if (!this.tooltip) return;
    const meta = this.partMetadata[regionName] || { name: regionName, icon: '📍' };
    const locName = window.I18N ? window.I18N.getBodyPartName(regionName) : meta.name;
    this.tooltip.innerHTML = `<span>${meta.icon}</span> <strong>${locName}</strong> <span class="tip-badge">Holo Scan</span>`;
    this.tooltip.classList.add('show');
    this.moveTooltip(e);
  }

  moveTooltip(e) {
    if (!this.tooltip) return;
    const containerRect = this.svgContainer.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.classList.remove('show');
    }
  }

  selectPart(partSlug) {
    this.selectedPart = partSlug;

    // Update active SVG classes
    const regions = this.svgContainer.querySelectorAll('.body-region');
    regions.forEach(el => {
      if (el.dataset.region === partSlug) {
        el.classList.add('active-selected');
      } else {
        el.classList.remove('active-selected');
      }
    });

    // Update pills
    if (this.pillsContainer) {
      this.pillsContainer.querySelectorAll('.part-pill-btn').forEach(btn => {
        if (btn.dataset.part === partSlug) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Update Biometric HUD
    const meta = this.partMetadata[partSlug] || this.partMetadata['all'];
    const locName = window.I18N ? window.I18N.getBodyPartName(partSlug) : meta.name;
    if (this.areaTitleEl) this.areaTitleEl.textContent = locName;
    if (this.areaDescEl) this.areaDescEl.textContent = meta.desc;
    if (this.areaIconEl) this.areaIconEl.textContent = meta.icon;

    // Trigger symptom filtering in form
    if (window.symptomFormController) {
      window.symptomFormController.filterByBodyPart(partSlug);
    }
  }
}

window.BodyDiagramController = BodyDiagramController;
