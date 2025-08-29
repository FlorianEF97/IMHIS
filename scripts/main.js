'use strict';

(() => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const langDeEls = document.querySelectorAll('.lang-de');
  const langEnEls = document.querySelectorAll('.lang-en');
  const altImgs = document.querySelectorAll('[data-alt-en]');
  const navToggle = document.querySelector('.nav-toggle');

  function setLanguage(lang) {
    if (document.documentElement.lang === lang) return;
    const english = lang === 'en';
    document.documentElement.lang = lang;

    for (const el of langDeEls) {
      el.hidden = english;
    }
    for (const el of langEnEls) {
      el.hidden = !english;
    }

    for (const btn of langButtons) {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', isActive);
    }

    if (navToggle) {
      const suffix = english ? 'En' : 'De';
      const open = navToggle.classList.contains('open');
      const key = `label${open ? 'Close' : 'Open'}${suffix}`;
      const label = navToggle.dataset[key];
      if (label) {
        navToggle.setAttribute('aria-label', label);
      }
    }

    for (const img of altImgs) {
      if (!img.dataset.altDe) {
        img.dataset.altDe = img.getAttribute('alt') || '';
      }
      const value = english ? img.dataset.altEn : img.dataset.altDe;
      img.setAttribute('alt', value);
    }

    try {
      localStorage.setItem('lang', lang);
    } catch {}

    // Notify other components (e.g., flip cards) that text content changed
    window.dispatchEvent(new Event('imhis-language-change'));
  }

  function getInitialLang() {
    try {
      const stored = localStorage.getItem('lang');
      if (stored === 'de' || stored === 'en') {
        return stored;
      }
    } catch {}
    return navigator.language?.startsWith('en') ? 'en' : 'de';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      setLanguage(btn.dataset.lang);
    }
  }, { passive: true });

  setLanguage(getInitialLang());
})();

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    function updateAriaLabel(open) {
      const langSuffix = document.documentElement.lang === 'en' ? 'En' : 'De';
      const key = open ? `labelClose${langSuffix}` : `labelOpen${langSuffix}`;
      const label = toggle.dataset[key];
      if (label) {
        toggle.setAttribute('aria-label', label);
      }
    }

    let navAbortController;

    function toggleMenu() {
      const open = links.classList.toggle('open');
      links.hidden = !open;
      toggle.setAttribute('aria-expanded', open);
      toggle.classList.toggle('open', open);
      updateAriaLabel(open);

      if (open) {
        navAbortController = new AbortController();
        document.addEventListener('click', closeOnOutsideClick, {
          signal: navAbortController.signal,
          passive: true,
        });
        document.addEventListener('keydown', closeOnEscape, {
          signal: navAbortController.signal,
        });
      } else {
        navAbortController?.abort();
        navAbortController = null;
      }
    }

    function closeOnOutsideClick(e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        toggleMenu();
      }
    }

    function closeOnEscape(e) {
      if (e.key === 'Escape') {
        toggleMenu();
      }
    }

    const mq = window.matchMedia('(min-width: 768px)');

    function syncNav(e) {
      links.hidden = !e.matches;
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      navAbortController?.abort();
      navAbortController = null;
    }

    syncNav(mq);
    mq.addEventListener('change', syncNav);

    toggle.addEventListener('click', toggleMenu);
    updateAriaLabel(false);

    links.addEventListener('click', (e) => {
      if (e.target.matches('a') && links.classList.contains('open')) {
        toggleMenu();
      }
    });
  }
})();

(() => {
  const toggleSellers = document.getElementById('toggle-sellers');
  const sellerList = document.getElementById('seller-list');

  if (toggleSellers && sellerList) {
    const toggleList = () => {
      const open = sellerList.classList.toggle('open');
      toggleSellers.setAttribute('aria-expanded', open);
      sellerList.hidden = !open;
      return open;
    };

    const closeOnOutsideClick = (e) => {
      if (
        sellerList.classList.contains('open') &&
        !sellerList.contains(e.target) &&
        !toggleSellers.contains(e.target)
      ) {
        toggleList();
      }
    };

    const closeOnEscape = (e) => {
      if (e.key === 'Escape' && sellerList.classList.contains('open')) {
        toggleList();
      }
    };

    let sellerAbortController;

    toggleSellers.addEventListener('click', () => {
      const open = toggleList();
      if (open) {
        sellerAbortController = new AbortController();
        document.addEventListener('click', closeOnOutsideClick, {
          signal: sellerAbortController.signal,
          passive: true,
        });
        document.addEventListener('keydown', closeOnEscape, {
          signal: sellerAbortController.signal,
        });
      } else {
        sellerAbortController?.abort();
        sellerAbortController = null;
      }
    });
  }
})();

