/**
 * Prime Trading Institute — Main JavaScript
 * ==========================================
 * Features:
 *  1. WhatsApp dynamic number (single source of truth)
 *  2. Sticky header with scroll class
 *  3. Mobile nav hamburger menu
 *  4. FAQ accordion
 *  5. Smooth scroll for anchor links
 *  6. Counter animation for stats
 *  7. Scroll-triggered fade-up animations
 *  8. Back-to-top button
 *  9. Copyright year auto-update
 */

'use strict';

/* =============================================
   1. WHATSAPP CONFIGURATION
   ─────────────────────────────────────────────
   Ubah HANYA di sini untuk update semua tombol
   WhatsApp di seluruh website secara otomatis.
============================================= */
const WA_CONFIG = {
  // Nomor tanpa spasi/tanda hubung, diawali kode negara
  number: '6281336307404',
  // Pesan default saat klik tombol WA
  defaultMessage: 'Halo, saya ingin berkonsultasi mengenai program edukasi trading di Prime Trading Institute.'
};

/**
 * Buat URL WhatsApp dari konfigurasi di atas
 */
function buildWhatsAppURL(message) {
  const msg = encodeURIComponent(message || WA_CONFIG.defaultMessage);
  return `https://wa.me/${WA_CONFIG.number}?text=${msg}`;
}

/**
 * Format nomor untuk ditampilkan (misal: +62 812-3456-7890)
 * Ambil dari elemen master di section kontak (#wa-number-display)
 */
function getDisplayNumber() {
  const el = document.getElementById('wa-number-display');
  return el ? el.textContent.trim() : `+${WA_CONFIG.number}`;
}

/**
 * Bind semua tombol dengan class .btn-whatsapp-dynamic
 * agar mengarah ke nomor yang sama.
 */
function initWhatsAppButtons() {
  const buttons = document.querySelectorAll('.btn-whatsapp-dynamic');
  const url = buildWhatsAppURL();
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // Update footer nomor dari master
  const footerWA = document.getElementById('footer-wa-number');
  if (footerWA) {
    footerWA.textContent = getDisplayNumber();
  }
}

/* =============================================
   2. STICKY HEADER
============================================= */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* =============================================
   3. MOBILE NAVIGATION
============================================= */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('mobile-overlay');

  if (!hamburger || !nav) return;

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* =============================================
   4. FAQ ACCORDION
============================================= */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* =============================================
   5. SMOOTH SCROLL FOR ANCHOR LINKS
============================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('site-header')?.offsetHeight || 72;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });
}

/* =============================================
   6. COUNTER ANIMATION
============================================= */
function animateCounter(el, target, duration) {
  const start = 0;
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString('id-ID');

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString('id-ID');
    }
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* =============================================
   7. SCROLL FADE-UP ANIMATIONS
============================================= */
function initScrollAnimations() {
  // Add fade-up class to elements
  const selectors = [
    '.program-card',
    '.timeline-item',
    '.testi-card',
    '.faq-item',
    '.kontak-item',
    '.stat-item',
    '.section-header',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-up');
      // Stagger delay for grid items
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* =============================================
   8. BACK TO TOP BUTTON
============================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   9. COPYRIGHT YEAR
============================================= */
function initCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =============================================
   10. ACTIVE NAV HIGHLIGHT ON SCROLL
============================================= */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? '#c9a227' : '';
        });
      }
    });
  }, {
    threshold: 0.45,
    rootMargin: '-72px 0px -45% 0px'
  });

  sections.forEach(s => observer.observe(s));
}

/* =============================================
   11. HERO CHART ANIMATION (subtle)
============================================= */
function initHeroChartPulse() {
  const candles = document.querySelectorAll('.candles rect');
  candles.forEach((rect, i) => {
    rect.style.animation = `candlePulse 3s ease-in-out ${i * 0.2}s infinite alternate`;
  });

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes candlePulse {
      from { opacity: 0.7; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

/* =============================================
   INIT ALL
============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButtons();
  initStickyHeader();
  initMobileNav();
  initFAQ();
  initSmoothScroll();
  initCounters();
  initScrollAnimations();
  initBackToTop();
  initCopyrightYear();
  initActiveNav();
  initHeroChartPulse();

  console.log('[Prime Trading Institute] Website loaded successfully.');
});
