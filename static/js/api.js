/**
 * MediGuide — Frontend API Client
 * Wraps RESTful endpoints for care evaluation, symptoms, and doctors.
 */

const API = {
  baseUrl: '/api',

  async getHealth() {
    const res = await fetch(`${this.baseUrl}/health`);
    return await res.json();
  },

  async getBodyParts() {
    const res = await fetch(`${this.baseUrl}/body-parts`);
    return await res.json();
  },

  async getSymptoms(bodyPart = '', search = '') {
    const params = new URLSearchParams();
    if (bodyPart && bodyPart !== 'all') params.append('body_part', bodyPart);
    if (search) params.append('search', search);
    const res = await fetch(`${this.baseUrl}/symptoms?${params.toString()}`);
    return await res.json();
  },

  async getEmergencyFlags() {
    const res = await fetch(`${this.baseUrl}/emergency-flags`);
    return await res.json();
  },

  async getSpecialties() {
    const res = await fetch(`${this.baseUrl}/specialties`);
    return await res.json();
  },

  async getCities() {
    const res = await fetch(`${this.baseUrl}/cities`);
    return await res.json();
  },

  async getDoctors(options = {}) {
    const params = new URLSearchParams();
    if (options.specialty && options.specialty !== 'all') params.append('specialty', options.specialty);
    if (options.city && options.city !== 'all') params.append('city', options.city);
    if (options.query) params.append('query', options.query);
    if (options.lat) params.append('lat', options.lat);
    if (options.lng) params.append('lng', options.lng);
    const res = await fetch(`${this.baseUrl}/doctors?${params.toString()}`);
    return await res.json();
  },

  async evaluateCare(payload) {
    const res = await fetch(`${this.baseUrl}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  async getDbStatus() {
    const res = await fetch(`${this.baseUrl}/db/status`);
    return await res.json();
  },

  async testDbConnection(config) {
    const res = await fetch(`${this.baseUrl}/db/test-connection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return await res.json();
  },

  async switchDbToMysql(config) {
    const res = await fetch(`${this.baseUrl}/db/switch-mysql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return await res.json();
  }
};

window.API = API;
