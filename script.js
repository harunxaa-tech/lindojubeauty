const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
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

tabButtons.forEach(button => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

function goToPrice(tabId, priceKey) {
  activateTab(tabId);
  const priceSection = document.getElementById('preise');
  priceSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  window.setTimeout(() => {
    document.querySelectorAll('.price-target-flash').forEach(el => el.classList.remove('price-target-flash'));
    if (!priceKey) return;
    const panel = document.getElementById(tabId);
    const target = panel?.querySelector(`[data-price-key="${priceKey}"]`);
    if (target) {
      target.classList.add('price-target-flash');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => target.classList.remove('price-target-flash'), 2200);
    }
  }, 650);
}

document.querySelectorAll('.price-jump').forEach(card => {
  const trigger = () => goToPrice(card.dataset.priceTab, card.dataset.priceKey);
  card.addEventListener('click', trigger);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      trigger();
    }
  });
});

document.querySelectorAll('.price-jump-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    goToPrice(link.dataset.priceTab, link.dataset.priceKey);
  });
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
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
