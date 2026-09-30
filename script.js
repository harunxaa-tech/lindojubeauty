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

const tabs = [...document.querySelectorAll('.tab-button')];
const panels = [...document.querySelectorAll('.price-panel')];

function activatePriceTab(tabId, shouldScroll = false) {
  tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === tabId));

  if (shouldScroll) {
    document.getElementById('preise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      document.querySelector(`.tab-button[data-tab="${tabId}"]`)?.focus({ preventScroll: true });
    }, 650);
  }
}

tabs.forEach(button => {
  button.addEventListener('click', () => activatePriceTab(button.dataset.tab));
});

document.querySelectorAll('.price-jump').forEach(card => {
  const go = () => activatePriceTab(card.dataset.priceTab, true);
  card.addEventListener('click', go);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      go();
    }
  });
});

const nisvDialog = document.getElementById('nisv-dialog');
document.querySelectorAll('[data-open-nisv]').forEach(button => {
  button.addEventListener('click', () => {
    if (nisvDialog?.showModal) nisvDialog.showModal();
  });
});
document.querySelectorAll('[data-close-nisv]').forEach(button => {
  button.addEventListener('click', () => nisvDialog?.close());
});
nisvDialog?.addEventListener('click', event => {
  if (event.target === nisvDialog) nisvDialog.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
});
