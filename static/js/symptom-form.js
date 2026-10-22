/**
 * MediGuide — Symptom Form Controller
 * Manages symptom search, primary/secondary selection, severity, duration,
 * red flag safety checklist, and form submission.
 */

class SymptomFormController {
  constructor() {
    this.allSymptoms = [];
    this.filteredSymptoms = [];
    this.selectedPrimarySymptom = null;
    this.selectedSecondarySymptoms = new Set();
    this.currentBodyPart = 'all';
    this.severity = 'moderate';
    this.duration = 'days_1_3';
    this.selectedRedFlags = new Set();
    this.ageGroup = 'adult';
    this.selectedCity = 'Chennai';

    // DOM Elements
    this.searchInput = document.getElementById('symptom-search-input');
    this.symptomsContainer = document.getElementById('symptoms-list-container');
    this.secContainer = document.getElementById('secondary-symptoms-container');
    this.redFlagContainer = document.getElementById('redflag-items-container');
    this.redFlagToggle = document.getElementById('redflag-header-toggle');
    this.redFlagContent = document.getElementById('redflag-content');
    this.redFlagIcon = document.getElementById('redflag-icon');
    this.evaluateBtn = document.getElementById('btn-evaluate-symptoms');
    this.citySelect = document.getElementById('patient-city-select');
    this.ageSelect = document.getElementById('patient-age-select');

    this.init();
  }

  async init() {
    await this.loadSymptoms();
    await this.loadEmergencyFlags();
    await this.loadCities();
    this.setupEventListeners();
  }

  async loadSymptoms() {
    try {
      const res = await API.getSymptoms();
      if (res.status === 'success') {
        this.allSymptoms = res.data;
        this.filterAndRenderSymptoms();
      }
    } catch (err) {
      console.error('Error fetching symptoms:', err);
    }
  }

  async loadEmergencyFlags() {
    try {
      const res = await API.getEmergencyFlags();
      if (res.status === 'success' && this.redFlagContainer) {
        this.redFlagContainer.innerHTML = '';
        res.data.forEach(rf => {
          const label = document.createElement('label');
          label.className = 'redflag-checkbox-item';
          label.innerHTML = `
            <input type="checkbox" value="${rf.slug}" class="rf-checkbox" />
            <div class="redflag-checkbox-label">
              <strong>${rf.title}</strong> — ${rf.description}
            </div>
          `;
          label.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
              this.selectedRedFlags.add(rf.slug);
            } else {
              this.selectedRedFlags.delete(rf.slug);
            }
          });
          this.redFlagContainer.appendChild(label);
        });
      }
    } catch (err) {
      console.error('Error loading emergency flags:', err);
    }
  }

  async loadCities() {
    try {
      const res = await API.getCities();
      if (res.status === 'success' && this.citySelect) {
        this.citySelect.innerHTML = '';
        res.data.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          if (c === 'Chennai') opt.selected = true;
          this.citySelect.appendChild(opt);
        });
      }
    } catch (err) {
      console.error('Error loading cities:', err);
    }
  }

  setupEventListeners() {
    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        this.filterAndRenderSymptoms();
      });
    }

    // Interactive 1-10 Pain Scale Slider
    const painSlider = document.getElementById('pain-intensity-slider');
    const painEmoji = document.getElementById('pain-emoji');
    const painScoreBadge = document.getElementById('pain-score-badge');
    const painLabel = document.getElementById('pain-level-label');

    if (painSlider) {
      painSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        if (painScoreBadge) painScoreBadge.textContent = `${val} / 10`;

        if (val <= 3) {
          this.severity = 'mild';
          if (painEmoji) painEmoji.textContent = '😊';
          if (painLabel) painLabel.textContent = 'Mild (Minor Discomfort)';
          window.soundSynthesizer?.playChime(440);
        } else if (val <= 6) {
          this.severity = 'moderate';
          if (painEmoji) painEmoji.textContent = '😐';
          if (painLabel) painLabel.textContent = 'Moderate (Interferes with Activities)';
          window.soundSynthesizer?.playChime(580);
        } else if (val <= 8) {
          this.severity = 'severe';
          if (painEmoji) painEmoji.textContent = '😣';
          if (painLabel) painLabel.textContent = 'Severe (Debilitating Pain)';
          window.soundSynthesizer?.playChime(740);
        } else {
          this.severity = 'severe';
          if (painEmoji) painEmoji.textContent = '🚨';
          if (painLabel) painLabel.textContent = 'Critical (Seek Emergency Care)';
          window.soundSynthesizer?.playChime(880);
        }
      });
    }

    // Duration chips
    const durButtons = document.querySelectorAll('.duration-chip-btn');
    durButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        durButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.duration = btn.dataset.duration;
        window.soundSynthesizer?.playChime(620);
      });
    });

    // Red flag accordion toggle
    if (this.redFlagToggle && this.redFlagContent) {
      this.redFlagToggle.addEventListener('click', () => {
        this.redFlagContent.classList.toggle('expanded');
        if (this.redFlagIcon) this.redFlagIcon.classList.toggle('expanded');
      });
    }

    // City & Age change
    if (this.citySelect) {
      this.citySelect.addEventListener('change', (e) => {
        this.selectedCity = e.target.value;
      });
    }
    if (this.ageSelect) {
      this.ageSelect.addEventListener('change', (e) => {
        this.ageGroup = e.target.value;
      });
    }

    // Evaluate submit button
    if (this.evaluateBtn) {
      this.evaluateBtn.addEventListener('click', () => {
        this.submitEvaluation();
      });
    }
  }

  filterByBodyPart(partSlug) {
    this.currentBodyPart = partSlug;
    this.filterAndRenderSymptoms();
  }

  filterAndRenderSymptoms() {
    const query = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';

    this.filteredSymptoms = this.allSymptoms.filter(sym => {
      const matchPart = (this.currentBodyPart === 'all' || sym.body_part_slug === this.currentBodyPart);
      const matchQuery = !query ||
        sym.name.toLowerCase().includes(query) ||
        (sym.description && sym.description.toLowerCase().includes(query)) ||
        (sym.common_triggers && sym.common_triggers.toLowerCase().includes(query));
      return matchPart && matchQuery;
    });

    this.renderPrimarySymptomList();
    this.renderSecondarySymptomsChips();
  }

  renderPrimarySymptomList() {
    if (!this.symptomsContainer) return;
    this.symptomsContainer.innerHTML = '';

    if (this.filteredSymptoms.length === 0) {
      this.symptomsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--slate-500);">
          <p>No symptoms matching your search in this area.</p>
          <button class="btn btn-outline" style="margin-top: 0.75rem;" onclick="window.symptomFormController.resetFilter()">
            Show all symptoms
          </button>
        </div>
      `;
      return;
    }

    this.filteredSymptoms.forEach(sym => {
      const item = document.createElement('div');
      const isSelected = this.selectedPrimarySymptom === sym.slug;
      const isEmergency = sym.is_emergency_flag;
      const localizedName = window.I18N ? window.I18N.getSymptomName(sym.slug) : sym.name;
      const emergencyBadgeText = window.I18N?.currentLang === 'te' ? '⚠️ అత్యవసర సంకేతం' :
                                 (window.I18N?.currentLang === 'hi' ? '⚠️ आपातकालीन संकेत' : '⚠️ Emergency Sign');

      item.className = `symptom-card-item ${isSelected ? 'selected' : ''} ${isEmergency ? 'emergency-item' : ''}`;
      item.innerHTML = `
        <input type="radio" name="primary_symptom" class="sym-radio" value="${sym.slug}" ${isSelected ? 'checked' : ''} />
        <div class="symptom-card-info">
          <div class="sym-name-row">
            <span class="sym-name">${localizedName}</span>
            ${isEmergency ? `<span class="sym-badge-emergency">${emergencyBadgeText}</span>` : ''}
          </div>
          <p class="sym-desc">${sym.description || 'Common bodily symptom.'}</p>
        </div>
      `;

      item.addEventListener('click', () => {
        this.selectPrimarySymptom(sym.slug);
      });

      this.symptomsContainer.appendChild(item);
    });
  }

  selectPrimarySymptom(slug) {
    this.selectedPrimarySymptom = slug;
    // Remove from secondary if present
    this.selectedSecondarySymptoms.delete(slug);

    // Re-render primary list styling
    const items = this.symptomsContainer.querySelectorAll('.symptom-card-item');
    items.forEach(el => {
      const radio = el.querySelector('input[type="radio"]');
      if (radio && radio.value === slug) {
        el.classList.add('selected');
        radio.checked = true;
      } else {
        el.classList.remove('selected');
        if (radio) radio.checked = false;
      }
    });

    this.renderSecondarySymptomsChips();
  }

  renderSecondarySymptomsChips() {
    if (!this.secContainer) return;
    this.secContainer.innerHTML = '';

    // Show top symptoms (excluding current primary)
    const availableSecondary = this.allSymptoms.filter(s => s.slug !== this.selectedPrimarySymptom);

    availableSecondary.slice(0, 16).forEach(sym => {
      const chip = document.createElement('button');
      const isAct = this.selectedSecondarySymptoms.has(sym.slug);
      const localizedName = window.I18N ? window.I18N.getSymptomName(sym.slug) : sym.name;
      chip.className = `sec-chip ${isAct ? 'active' : ''}`;
      chip.innerHTML = `${isAct ? '✓' : '+'} ${localizedName}`;
      chip.type = 'button';

      chip.addEventListener('click', () => {
        if (this.selectedSecondarySymptoms.has(sym.slug)) {
          this.selectedSecondarySymptoms.delete(sym.slug);
        } else {
          this.selectedSecondarySymptoms.add(sym.slug);
        }
        this.renderSecondarySymptomsChips();
      });

      this.secContainer.appendChild(chip);
    });
  }

  resetFilter() {
    if (this.searchInput) this.searchInput.value = '';
    this.currentBodyPart = 'all';
    if (window.bodyDiagramController) {
      window.bodyDiagramController.selectPart('all');
    }
    this.filterAndRenderSymptoms();
  }

  async submitEvaluation() {
    if (!this.selectedPrimarySymptom) {
      alert('Please select your main symptom from the list before requesting guidance.');
      if (this.symptomsContainer) {
        this.symptomsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Set loading state
    const originalText = this.evaluateBtn.innerHTML;
    this.evaluateBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Evaluating Care Rules...
    `;
    this.evaluateBtn.disabled = true;

    const payload = {
      primary_symptom: this.selectedPrimarySymptom,
      secondary_symptoms: Array.from(this.selectedSecondarySymptoms),
      severity: this.severity,
      duration: this.duration,
      red_flags: Array.from(this.selectedRedFlags),
      age_group: this.ageGroup,
      city: this.selectedCity,
      lat: window.userCoordinates ? window.userCoordinates.lat : null,
      lng: window.userCoordinates ? window.userCoordinates.lng : null
    };

    try {
      const res = await API.evaluateCare(payload);
      if (res.status === 'success' && window.guidanceController) {
        window.guidanceController.renderResults(res.data);
      } else {
        alert(res.message || 'Error evaluating symptoms. Please try again.');
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
      alert('Unable to connect to evaluation engine. Please make sure the backend is active.');
    } finally {
      this.evaluateBtn.innerHTML = originalText;
      this.evaluateBtn.disabled = false;
    }
  }
}

window.SymptomFormController = SymptomFormController;
