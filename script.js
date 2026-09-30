const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
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
