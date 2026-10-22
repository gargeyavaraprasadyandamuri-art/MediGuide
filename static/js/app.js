/**
 * MediGuide — Main Application Orchestrator
 * Bootstraps controllers, live ECG canvas telemetry, Web Audio chime synthesizer,
 * Theme switcher, and database modal.
 */

// ------------------ 1. Web Audio Sound Synthesizer ------------------
class SoundSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.btn = document.getElementById('btn-sound-toggle');
    if (this.btn) {
      this.btn.addEventListener('click', () => this.toggleSound());
    }
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (this.btn) {
      this.btn.classList.toggle('active', this.enabled);
      this.btn.innerHTML = this.enabled ? '🔊' : '🔇';
    }
  }

  playChime(freq = 640, duration = 0.12) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  playEmergencyAlert() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
      osc.frequency.setValueAtTime(660, this.audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.35);
    } catch (e) {
      // Ignore
    }
  }
}

// ------------------ 2. Real-time ECG Live Wave Monitor ------------------
class ECGMonitor {
  constructor() {
    this.canvas = document.getElementById('ecg-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.bpmEl = document.getElementById('ecg-bpm-readout');
    this.rate = 74;
    this.x = 0;
    this.points = [];
    this.phase = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.midY = this.canvas.height / 2;
  }

  setRate(bpm) {
    this.rate = bpm;
    if (this.bpmEl) this.bpmEl.textContent = bpm;
  }

  startLoop() {
    const draw = () => {
      if (!this.canvas || !this.ctx) return;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const mid = h / 2;

      // Speed depends on rate
      const step = 2.4 * (this.rate / 75);
      this.x += step;
      this.phase += 0.05 * (this.rate / 75);

      // Heartbeat pulse wave simulation (P-Q-R-S-T)
      let y = mid;
      const cycle = this.phase % (Math.PI * 2);

      if (cycle > 1.2 && cycle < 1.4) {
        // P wave
        y = mid - 8 * Math.sin((cycle - 1.2) * Math.PI / 0.2);
      } else if (cycle > 1.5 && cycle < 1.6) {
        // Q wave
        y = mid + 6;
      } else if (cycle >= 1.6 && cycle < 1.75) {
        // R spike
        const frac = (cycle - 1.6) / 0.15;
        y = mid - 45 * Math.sin(frac * Math.PI);
      } else if (cycle >= 1.75 && cycle < 1.85) {
        // S wave
        y = mid + 12 * Math.sin((cycle - 1.75) * Math.PI / 0.1);
      } else if (cycle > 2.1 && cycle < 2.5) {
        // T wave
        y = mid - 14 * Math.sin((cycle - 2.1) * Math.PI / 0.4);
      }

      this.points.push({ x: this.x, y: y });

      // Wrap around canvas
      if (this.x > w) {
        this.x = 0;
        this.points = [];
      }

      // Draw trails
      this.ctx.fillStyle = 'rgba(7, 11, 20, 0.16)';
      this.ctx.fillRect(0, 0, w, h);

      if (this.points.length > 1) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00f2fe';
        this.ctx.lineWidth = 2.2;
        this.ctx.shadowColor = '#00f2fe';
        this.ctx.shadowBlur = 8;

        for (let i = 0; i < this.points.length; i++) {
          if (i === 0) {
            this.ctx.moveTo(this.points[i].x, this.points[i].y);
          } else {
            this.ctx.lineTo(this.points[i].x, this.points[i].y);
          }
        }
        this.ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }
}

// ------------------ 3. Theme Controller (Dark Hologram / Light Glass) ------------------
class ThemeController {
  constructor() {
    this.btn = document.getElementById('btn-theme-toggle');
    const savedTheme = localStorage.getItem('mediguide-theme') || 'dark';
    this.setTheme(savedTheme);

    if (this.btn) {
      this.btn.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
      });
    }
  }

  setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('mediguide-theme', theme);
    if (this.btn) {
      this.btn.innerHTML = theme === 'light' ? '☀️' : '🌙';
      this.btn.title = `Switch to ${theme === 'light' ? 'Dark Hologram' : 'Light Glass'} Mode`;
    }
  }
}

// ------------------ 4. Main Bootstrap ------------------
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[*] MediGuide initializing with futuristic bio-medical theme...');

  // Audio and Visual Monitors
  window.soundSynthesizer = new SoundSynthesizer();
  window.ecgMonitor = new ECGMonitor();
  window.themeController = new ThemeController();

  // Core Clinical Controllers
  window.bodyDiagramController = new BodyDiagramController();
  window.symptomFormController = new SymptomFormController();
  window.guidanceController = new GuidanceController();
  window.doctorFinderController = new DoctorFinderController();

  // Language Switcher (EN / TE / HI)
  initLanguageSwitcher();

  // Database Status & Settings Modal
  initDatabaseStatus();

  // Emergency Hotlines Modal
  initEmergencyModal();

  // Smooth Scrolling Nav Links
  initNavLinks();
});

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      window.I18N?.setLanguage(lang);
      window.soundSynthesizer?.playChime(700);
    });
  });

  // Apply stored or default language
  if (window.I18N) {
    window.I18N.setLanguage(window.I18N.currentLang);
  }
}

async function initDatabaseStatus() {
  const dbBadge = document.getElementById('db-status-badge');
  const dbModal = document.getElementById('db-settings-modal');
  const dbTestBtn = document.getElementById('btn-test-mysql');
  const dbSwitchBtn = document.getElementById('btn-switch-mysql');
  const dbFeedback = document.getElementById('db-feedback-msg');

  if (!dbBadge) return;

  try {
    const status = await API.getDbStatus();
    updateDbBadge(status.active_engine);

    if (status.mysql_config) {
      document.getElementById('db-cfg-host').value = status.mysql_config.host || 'localhost';
      document.getElementById('db-cfg-user').value = status.mysql_config.user || 'root';
      document.getElementById('db-cfg-port').value = status.mysql_config.port || 3306;
      document.getElementById('db-cfg-database').value = status.mysql_config.database || 'mediguide_db';
    }
  } catch (e) {
    console.warn('Could not fetch DB status:', e);
  }

  dbBadge.addEventListener('click', () => {
    if (dbModal) dbModal.classList.add('show');
  });

  const closeTriggers = document.querySelectorAll('.db-modal-close');
  closeTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (dbModal) dbModal.classList.remove('show');
    });
  });

  if (dbTestBtn) {
    dbTestBtn.addEventListener('click', async () => {
      const config = getDbFormData();
      dbTestBtn.disabled = true;
      dbTestBtn.textContent = 'Testing...';
      dbFeedback.innerHTML = '<span style="color: var(--text-muted);">Testing connection to MySQL server...</span>';

      try {
        const res = await API.testDbConnection(config);
        if (res.connected) {
          dbFeedback.innerHTML = `<span style="color: var(--success); font-weight: 700;">✓ ${res.message}</span>`;
        } else {
          dbFeedback.innerHTML = `<span style="color: var(--danger); font-weight: 700;">✗ ${res.message}</span>`;
        }
      } catch (err) {
        dbFeedback.innerHTML = `<span style="color: var(--danger);">Connection check failed: ${err.message}</span>`;
      } finally {
        dbTestBtn.disabled = false;
        dbTestBtn.textContent = 'Test Connection';
      }
    });
  }

  if (dbSwitchBtn) {
    dbSwitchBtn.addEventListener('click', async () => {
      const config = getDbFormData();
      dbSwitchBtn.disabled = true;
      dbSwitchBtn.textContent = 'Connecting & Seeding...';
      dbFeedback.innerHTML = '<span style="color: var(--text-muted);">Connecting to MySQL and syncing healthcare schema...</span>';

      try {
        const res = await API.switchDbToMysql(config);
        if (res.status === 'success') {
          dbFeedback.innerHTML = `<span style="color: var(--success); font-weight: 700;">✓ ${res.message}</span>`;
          updateDbBadge('mysql');
          setTimeout(() => {
            if (dbModal) dbModal.classList.remove('show');
            location.reload();
          }, 1500);
        } else {
          dbFeedback.innerHTML = `<span style="color: var(--danger); font-weight: 700;">✗ ${res.message}</span>`;
        }
      } catch (err) {
        dbFeedback.innerHTML = `<span style="color: var(--danger);">Failed to switch: ${err.message}</span>`;
      } finally {
        dbSwitchBtn.disabled = false;
        dbSwitchBtn.textContent = 'Switch & Sync to MySQL';
      }
    });
  }
}

function getDbFormData() {
  return {
    host: document.getElementById('db-cfg-host').value.trim(),
    port: document.getElementById('db-cfg-port').value.trim(),
    user: document.getElementById('db-cfg-user').value.trim(),
    password: document.getElementById('db-cfg-password').value,
    database: document.getElementById('db-cfg-database').value.trim()
  };
}

function updateDbBadge(engine) {
  const badge = document.getElementById('db-status-badge');
  if (!badge) return;
  if (engine === 'mysql') {
    badge.innerHTML = `<span class="db-status-dot" style="background: var(--success);"></span> DB: MySQL (Active)`;
    badge.title = 'Active Database: MySQL Server (mediguide_db)';
  } else {
    badge.innerHTML = `<span class="db-status-dot" style="background: var(--neon-cyan);"></span> DB: SQLite (Active)`;
    badge.title = 'Active Database: SQLite Fallback (mediguide.db). Click to configure MySQL.';
  }
}

function initEmergencyModal() {
  const modal = document.getElementById('emergency-modal');
  const openButtons = document.querySelectorAll('.open-emergency-modal');
  const closeButtons = document.querySelectorAll('.emergency-modal-close');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('show');
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('show');
    });
  });
}

function initNavLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
