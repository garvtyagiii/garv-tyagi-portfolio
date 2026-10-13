/**
 * Garv Tyagi Portfolio — script.js
 */

/* ── DOM refs ─────────────────────────────────── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const backToTop   = document.getElementById('back-to-top');
const yearEl      = document.getElementById('year');
const allNavLinks = document.querySelectorAll('.nav-link');

/* ── Year ─────────────────────────────────────── */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Theme toggle ─────────────────────────────── */
const THEME_KEY = 'gt-theme';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeToggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem(THEME_KEY, t);
}

applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ── Mobile nav ───────────────────────────────── */
function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close menu');
}
function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
}

hamburger.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());

allNavLinks.forEach(l => l.addEventListener('click', closeMenu));

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) { closeMenu(); hamburger.focus(); }
});

/* ── Scroll effects ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  const y = window.scrollY;

  navbar.classList.toggle('scrolled', y > 10);
  backToTop.classList.toggle('visible', y > 300);

  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - 80;
    const bottom = top + sec.offsetHeight;
    if (y >= top && y < bottom) current = sec.id;
  });

  allNavLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('data-section') === current) l.classList.add('active');
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Back to top ──────────────────────────────── */
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Fade-in on scroll ────────────────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll(
    '.proj-card, .skill-chip, .acard, .ccard, .side-panel, .hero-text, .sec-title'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.3)}s`;
    obs.observe(el);
  });
}

/* ── Smooth scroll fallback ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - navbar.offsetHeight, behavior: 'smooth' });
  });
});
