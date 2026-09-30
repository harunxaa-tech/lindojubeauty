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

const tabs = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.price-panel');

tabs.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    tabs.forEach(btn => btn.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(tab)?.classList.add('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
});
