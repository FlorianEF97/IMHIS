'use strict';

(() => {
  const langButtons = document.querySelectorAll('.lang-btn');

  function setLanguage(lang) {
    const english = lang === 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-de').forEach((el) => {
      el.hidden = english;
    });
    document.querySelectorAll('.lang-en').forEach((el) => {
      el.hidden = !english;
    });

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', isActive);
    });

    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
      const suffix = english ? 'En' : 'De';
      const open = navToggle.classList.contains('open');
      const key = open ? `labelClose${suffix}` : `labelOpen${suffix}`;
      const label = navToggle.dataset[key];
      if (label) {
        navToggle.setAttribute('aria-label', label);
      }
    }

    document.querySelectorAll('[data-alt-en]').forEach((img) => {
      if (!img.dataset.altDe) {
        img.dataset.altDe = img.getAttribute('alt') || '';
      }
      const value = english ? img.dataset.altEn : img.dataset.altDe;
      img.setAttribute('alt', value);
    });

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

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

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
      if (e.matches) {
        links.hidden = false;
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        navAbortController?.abort();
        navAbortController = null;
      } else {
        links.hidden = true;
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        navAbortController?.abort();
        navAbortController = null;
      }
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

