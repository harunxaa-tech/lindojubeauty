/* Einwilligungsverwaltung ohne Tracking; optionale Google Fonts laden erst nach Einwilligung. */
(() => {
  'use strict';
  const STORAGE_KEY = 'lindoju-privacy-choice-v1';
  const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap";
  const banner = document.getElementById('privacy-banner');
  const details = document.getElementById('privacy-details');
  const optIn = document.getElementById('privacy-fonts-optin');
  const settingsButton = document.querySelector('[data-privacy-settings]');
  const saveButton = document.querySelector('[data-privacy-save]');
  if (!banner || !details || !optIn) return;

  function readChoice() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored && typeof stored.fonts === 'boolean' && typeof stored.at === 'string') {
        const age = Date.now() - Date.parse(stored.at);
        if (Number.isFinite(age) && age >= 0 && age < 180 * 86400000) return stored;
      }
    } catch (_) { /* Storage ist eventuell gesperrt. */ }
    return null;
  }

  function loadOptionalFonts() {
    if (document.getElementById('privacy-google-fonts')) return;
    const stylesheet = document.createElement('link');
    stylesheet.id = 'privacy-google-fonts';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = GOOGLE_FONTS_URL;
    document.head.appendChild(stylesheet);
  }

  function openSettings() {
    const current = readChoice();
    optIn.checked = !!(current && current.fonts);
    details.hidden = false;
    settingsButton.hidden = true;
    saveButton.hidden = false;
    banner.hidden = false;
  }

  function storeChoice(fonts) {
    const previouslyLoaded = !!document.getElementById('privacy-google-fonts');
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ fonts, at: new Date().toISOString() })); }
    catch (_) { /* Ohne Storage erfolgt eine erneute Abfrage beim nächsten Besuch. */ }
    banner.hidden = true;
    details.hidden = true;
    settingsButton.hidden = false;
    saveButton.hidden = true;
    if (fonts) loadOptionalFonts();
    else if (previouslyLoaded) window.location.reload();
  }

  document.querySelector('[data-privacy-reject]')?.addEventListener('click', () => storeChoice(false));
  document.querySelector('[data-privacy-accept]')?.addEventListener('click', () => storeChoice(true));
  settingsButton?.addEventListener('click', openSettings);
  saveButton?.addEventListener('click', () => storeChoice(optIn.checked));
  document.querySelectorAll('[data-privacy-open]').forEach(button => button.addEventListener('click', openSettings));

  const current = readChoice();
  if (current) {
    // A saved choice must suppress the notice on all page reloads.
    banner.hidden = true;
    if (current.fonts) loadOptionalFonts();
  } else {
    // First visit: the HTML also renders the notice if this script was not loaded.
    banner.hidden = false;
  }
})();
