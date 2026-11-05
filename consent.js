/* Compatibility for older cached Lindoju Beauty pages.
   External Google Fonts and consent storage are no longer used. */
(() => {
  'use strict';
  try { localStorage.removeItem('lindoju-privacy-choice-v1'); } catch (_) {}
  const oldBanner = document.getElementById('privacy-banner');
  if (oldBanner) oldBanner.hidden = true;
  // Older cached HTML may load an earlier stylesheet without local @font-face rules.
  if (!document.querySelector('link[href*="styles.css?v=23"]')) {
    const currentStyle = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .find(link => link.getAttribute('href')?.startsWith('styles.css'));
    if (currentStyle) currentStyle.href = 'styles.css?v=23';
  }
})();
