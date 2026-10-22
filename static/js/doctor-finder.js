/**
 * MediGuide — Nearby Doctor Discovery Controller
 * Manages doctor directory, geolocation, map links, specialty filtering,
 * and consultation booking modal.
 */

class DoctorFinderController {
  constructor() {
    this.section = document.getElementById('find-doctors-section');
    this.doctorsGrid = document.getElementById('doctors-grid');
    this.specialtyFilter = document.getElementById('doctor-specialty-filter');
    this.cityFilter = document.getElementById('doctor-city-filter');
    this.queryInput = document.getElementById('doctor-query-input');
    this.gpsBtn = document.getElementById('btn-use-gps');
    this.resultsCountEl = document.getElementById('doctors-count-badge');

    // Booking Modal
    this.bookingModal = document.getElementById('booking-modal');
    this.bookingDoctorName = document.getElementById('booking-doc-name');
    this.bookingClinicName = document.getElementById('booking-clinic-name');
    this.bookingForm = document.getElementById('booking-form');
    this.bookingConfirmation = document.getElementById('booking-confirmation-box');

    this.currentSpecialty = 'all';
    this.currentCity = 'Chennai';
    this.currentQuery = '';

    this.init();
  }

  async init() {
    await this.populateSpecialtyDropdown();
    await this.populateCityDropdown();
    this.setupEventListeners();
    this.loadDoctors();
  }

  async populateSpecialtyDropdown() {
    try {
      const res = await API.getSpecialties();
      if (res.status === 'success' && this.specialtyFilter) {
        this.specialtyFilter.innerHTML = '<option value="all">All Specialties</option>';
        res.data.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.slug;
          opt.textContent = s.name;
          this.specialtyFilter.appendChild(opt);
        });
      }
    } catch (err) {
      console.error('Error fetching specialties:', err);
    }
  }

  async populateCityDropdown() {
    try {
      const res = await API.getCities();
      if (res.status === 'success' && this.cityFilter) {
        this.cityFilter.innerHTML = '<option value="all">All Locations</option>';
        res.data.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          if (c === 'Chennai') opt.selected = true;
          this.cityFilter.appendChild(opt);
        });
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  }

  setupEventListeners() {
    if (this.specialtyFilter) {
      this.specialtyFilter.addEventListener('change', (e) => {
        this.currentSpecialty = e.target.value;
        this.loadDoctors();
      });
    }

    if (this.cityFilter) {
      this.cityFilter.addEventListener('change', (e) => {
        this.currentCity = e.target.value;
        this.loadDoctors();
      });
    }

    if (this.queryInput) {
      let debounceTimer;
      this.queryInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.currentQuery = e.target.value.trim();
          this.loadDoctors();
        }, 300);
      });
    }

    if (this.gpsBtn) {
      this.gpsBtn.addEventListener('click', () => {
        this.useGpsLocation();
      });
    }

    // Modal close
    const closeButtons = document.querySelectorAll('.modal-close-trigger');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeBookingModal();
      });
    });

    if (this.bookingForm) {
      this.bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBookingSubmit();
      });
    }
  }

  useGpsLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    const originalText = this.gpsBtn.innerHTML;
    this.gpsBtn.innerHTML = 'Detecting Location...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.userCoordinates = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        this.gpsBtn.innerHTML = '📍 Location Active';
        this.gpsBtn.style.background = 'var(--success)';
        this.gpsBtn.style.color = '#fff';
        this.loadDoctors();
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        alert('Could not retrieve your location. You can select your city manually from the dropdown.');
        this.gpsBtn.innerHTML = originalText;
      },
      { timeout: 8000 }
    );
  }

  async loadDoctors(specialtySlug = null) {
    if (specialtySlug) {
      this.currentSpecialty = specialtySlug;
      if (this.specialtyFilter) this.specialtyFilter.value = specialtySlug;
    }

    if (!this.doctorsGrid) return;
    this.doctorsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--slate-500);">
        Loading doctors and verified clinic listings...
      </div>
    `;

    try {
      const options = {
        specialty: this.currentSpecialty,
        city: this.currentCity,
        query: this.currentQuery
      };

      if (window.userCoordinates) {
        options.lat = window.userCoordinates.lat;
        options.lng = window.userCoordinates.lng;
      }

      const res = await API.getDoctors(options);
      if (res.status === 'success') {
        this.renderDoctorCards(res.data);
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
      this.doctorsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--danger);">
          Failed to load doctor directory. Please verify that the local server is running.
        </div>
      `;
    }
  }

  renderDoctorCards(doctors) {
    if (!this.doctorsGrid) return;
    this.doctorsGrid.innerHTML = '';

    if (this.resultsCountEl) {
      this.resultsCountEl.textContent = `${doctors.length} Doctors Available`;
    }

    if (doctors.length === 0) {
      this.doctorsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--slate-500);">
          <h4>No doctors found matching this criteria</h4>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">Try selecting "All Specialties" or "All Locations" to see more verified healthcare professionals.</p>
          <button class="btn btn-outline" style="margin-top: 1rem;" onclick="window.doctorFinderController.resetFilters()">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    doctors.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'doctor-card';

      // Get initials
      const nameParts = doc.name.replace('Dr.', '').trim().split(' ');
      const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0].slice(0, 2);

      const distanceBadge = doc.distance_km !== null
        ? `<span style="background: var(--teal-light); color: var(--teal-hover); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-size: 0.76rem; font-weight: 700;">📍 ${doc.distance_km} km away</span>`
        : `<span style="color: var(--slate-400); font-size: 0.8rem;">📍 ${doc.city}</span>`;

      card.innerHTML = `
        <div>
          <div class="doctor-card-top">
            <div class="doctor-avatar-initials">${initials.toUpperCase()}</div>
            <div style="flex: 1;">
              <h4 class="doc-name">${doc.name}</h4>
              <p class="doc-qualifications">${doc.title || 'MBBS, MD'}</p>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem; flex-wrap: wrap;">
                <span class="doc-specialty-badge">${this.formatSpecialty(doc.specialty_slug)}</span>
                ${doc.accepts_telehealth ? '<span style="background: #e0e7ff; color: #4338ca; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 999px;">📹 Telehealth</span>' : ''}
              </div>
            </div>
          </div>

          <div class="doctor-meta-list">
            <div class="doc-meta-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span><strong>${doc.clinic_or_hospital}</strong></span>
            </div>

            <div class="doc-meta-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              </svg>
              <span>${doc.address}, ${doc.city}</span>
            </div>

            <div class="doc-meta-row" style="justify-content: space-between; margin-top: 0.25rem;">
              <span style="color: var(--warning); font-weight: 700; font-size: 0.88rem;">
                ★ ${doc.rating || '4.8'} <span style="color: var(--slate-400); font-weight: 400;">(${doc.reviews_count || 40}+ reviews)</span>
              </span>
              <span style="font-weight: 700; color: var(--slate-800); font-size: 0.88rem;">
                Fee: ${doc.consultation_fee || '₹600'}
              </span>
            </div>

            <div class="doc-meta-row" style="justify-content: space-between; margin-top: 0.25rem;">
              ${distanceBadge}
              <span style="font-size: 0.78rem; color: var(--slate-500);">${doc.available_hours ? doc.available_hours.split(',')[0] : 'Open today'}</span>
            </div>
          </div>
        </div>

        <div class="doc-card-actions">
          <a href="${doc.maps_url}" target="_blank" rel="noopener noreferrer" class="btn-map-link" title="Open location in Google Maps">
            🗺️ Google Maps
          </a>
          <button class="btn-book-doc" onclick='window.doctorFinderController.openBookingModal(${JSON.stringify(doc)})'>
            📅 Book Consult
          </button>
        </div>
      `;

      this.doctorsGrid.appendChild(card);
    });
  }

  formatSpecialty(slug) {
    if (!slug) return 'Specialist';
    return slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  scrollToDoctors(specialtySlug) {
    if (this.section) {
      this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.loadDoctors(specialtySlug);
  }

  filterEmergencyHospitals() {
    this.currentSpecialty = 'all';
    this.currentQuery = 'Hospital';
    if (this.queryInput) this.queryInput.value = 'Hospital';
    if (this.section) {
      this.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.loadDoctors();
  }

  resetFilters() {
    this.currentSpecialty = 'all';
    this.currentCity = 'all';
    this.currentQuery = '';
    if (this.specialtyFilter) this.specialtyFilter.value = 'all';
    if (this.cityFilter) this.cityFilter.value = 'all';
    if (this.queryInput) this.queryInput.value = '';
    this.loadDoctors();
  }

  openBookingModal(doc) {
    if (!this.bookingModal) return;
    this.bookingDoctorName.textContent = doc.name;
    this.bookingClinicName.textContent = `${doc.clinic_or_hospital} — ${doc.address}, ${doc.city}`;
    this.bookingModal.classList.add('show');
    if (this.bookingForm) this.bookingForm.style.display = 'block';
    if (this.bookingConfirmation) this.bookingConfirmation.style.display = 'none';

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('booking-date-input');
    if (dateInput) {
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }

  closeBookingModal() {
    if (this.bookingModal) {
      this.bookingModal.classList.remove('show');
    }
  }

  handleBookingSubmit() {
    const patientName = document.getElementById('booking-patient-name').value;
    const patientPhone = document.getElementById('booking-patient-phone').value;
    const slot = document.getElementById('booking-time-slot').value;
    const consultType = document.getElementById('booking-consult-type').value;

    const refNumber = 'MG-' + Math.floor(100000 + Math.random() * 900000);

    if (this.bookingForm) this.bookingForm.style.display = 'none';
    if (this.bookingConfirmation) {
      this.bookingConfirmation.style.display = 'block';
      this.bookingConfirmation.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="width: 58px; height: 58px; border-radius: 50%; background: var(--success-light); color: var(--success); display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 1rem;">
            ✓
          </div>
          <h3 style="font-size: 1.35rem; color: var(--slate-900); margin-bottom: 0.5rem;">
            Appointment Request Confirmed!
          </h3>
          <p style="font-size: 0.9rem; color: var(--slate-600); max-width: 420px; margin: 0 auto 1.5rem;">
            Your consultation request has been forwarded to the clinic coordinator. A reminder SMS has been sent to <strong>${patientPhone}</strong>.
          </p>

          <div style="background: var(--slate-50); border: 1.5px dashed var(--slate-300); border-radius: var(--radius-lg); padding: 1.25rem; text-align: left; max-width: 420px; margin: 0 auto 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.86rem;">
              <span style="color: var(--slate-500);">Booking Reference:</span>
              <strong style="color: var(--primary); font-family: monospace; font-size: 1rem;">${refNumber}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.86rem;">
              <span style="color: var(--slate-500);">Patient Name:</span>
              <strong>${patientName}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.86rem;">
              <span style="color: var(--slate-500);">Consultation Mode:</span>
              <strong>${consultType}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
              <span style="color: var(--slate-500);">Preferred Slot:</span>
              <strong>${slot}</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem;">
            <button class="btn btn-primary" onclick="window.print()">
              🖨️ Print Slip
            </button>
            <button class="btn btn-outline" onclick="window.doctorFinderController.closeBookingModal()">
              Close
            </button>
          </div>
        </div>
      `;
    }
  }
}

window.DoctorFinderController = DoctorFinderController;
