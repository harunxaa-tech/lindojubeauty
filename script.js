const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const menuClose = document.querySelector('.menu-close');
const navBackdrop = document.querySelector('.nav-backdrop');

function setMenu(open) {
  if (!menuToggle || !siteNav) return;
  siteNav.classList.toggle('open', open);
  navBackdrop?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  if (open) window.setTimeout(() => menuClose?.focus(), 120);
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => setMenu(!siteNav.classList.contains('open')));
  menuClose?.addEventListener('click', () => setMenu(false));
  navBackdrop?.addEventListener('click', () => setMenu(false));
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && siteNav.classList.contains('open')) setMenu(false);
  });
}

const tabButtons = [...document.querySelectorAll('.tab-button')];
const panels = [...document.querySelectorAll('.price-panel')];

function activateTab(tabId) {
  tabButtons.forEach(button => {
    const active = button.dataset.tab === tabId;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  panels.forEach(panel => panel.classList.toggle('active', panel.id === tabId));
}

tabButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));

const linkedPriceTab = new URLSearchParams(window.location.search).get('tab');
if (['women', 'men', 'facecare', 'makeup'].includes(linkedPriceTab)) {
  activateTab(linkedPriceTab);
}

function goToPrice(tabId) {
  activateTab(tabId);
  const priceSection = document.getElementById('preise');
  window.requestAnimationFrame(() => priceSection?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

document.querySelectorAll('.price-jump').forEach(card => {
  const trigger = () => goToPrice(card.dataset.priceTab);
  card.addEventListener('click', trigger);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      trigger();
    }
  });
});

document.querySelectorAll('.price-jump-link').forEach(button => {
  button.addEventListener('click', () => goToPrice(button.dataset.priceTab));
});

const modal = document.getElementById('nisv-modal');
const openNisvButtons = document.querySelectorAll('[data-open-nisv]');
const closeNisvButtons = document.querySelectorAll('[data-close-nisv]');

function openNisv() {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeNisv() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
openNisvButtons.forEach(button => button.addEventListener('click', openNisv));
closeNisvButtons.forEach(button => button.addEventListener('click', closeNisv));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) closeNisv();
  if (event.key === 'Escape' && siteNav?.classList.contains('open')) setMenu(false);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Open direct links to a specific section while keeping reloads at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const pageNavigation = window.performance?.getEntriesByType?.('navigation')?.[0];
const isPageReload = pageNavigation?.type === 'reload';
function positionPageOnInitialOpen() {
  if (!isPageReload && window.location.hash) {
    const section = document.getElementById(window.location.hash.slice(1));
    if (section) {
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
  }
  window.scrollTo(0, 0);
}
window.addEventListener('pageshow', positionPageOnInitialOpen);
window.addEventListener('load', () => {
  positionPageOnInitialOpen();
  window.setTimeout(positionPageOnInitialOpen, 80);
});
