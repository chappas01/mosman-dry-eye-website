// Thin API client for the clinic backend (server.js in this repo).
// In development, Vite proxies /api -> http://localhost:3000 (see vite.config.js).

async function post(path, payload) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON error body */ }
  if (!res.ok || (data && data.success === false)) {
    const message = data?.error || (data?.details && data.details[0]) || `Request failed (${res.status})`;
    throw new Error(typeof message === 'string' ? message : 'Request failed. Please try again or call us.');
  }
  return data;
}

/**
 * Submit a consultation request.
 * @param {{name: string, email: string, phone?: string, patientType: 'new'|'returning', preferredDate?: string, preferredTime?: string, symptoms?: string}} form
 */
export function submitBooking(form) {
  const nameParts = form.name.trim().split(/\s+/);
  const firstName = nameParts.shift() || '';
  const lastName = nameParts.join(' ');

  return post('/api/booking', {
    firstName,
    lastName: lastName || undefined,
    email: form.email,
    phone: form.phone || undefined,
    patientType: form.patientType,
    preferredDate: form.preferred_date || undefined,
    preferredTime: form.preferred_time || undefined,
    symptoms: form.symptoms || undefined,
  });
}

/** Submit a contact message. */
export function submitContact({ name, email, message }) {
  return post('/api/contact', { name, email, message });
}
