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
  const rect = nisvDialog.getBoundingClientRect();
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) nisvDialog.close();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
