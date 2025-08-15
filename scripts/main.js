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
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage('de');
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

    function toggleMenu() {
      const open = links.classList.toggle('open');
      links.hidden = !open;
      toggle.setAttribute('aria-expanded', open);
      toggle.classList.toggle('open', open);
      updateAriaLabel(open);

      if (open) {
        document.addEventListener('click', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
      } else {
        document.removeEventListener('click', closeOnOutsideClick);
        document.removeEventListener('keydown', closeOnEscape);
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
        document.removeEventListener('click', closeOnOutsideClick);
        document.removeEventListener('keydown', closeOnEscape);
      } else {
        links.hidden = true;
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeOnOutsideClick);
        document.removeEventListener('keydown', closeOnEscape);
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

    toggleSellers.addEventListener('click', () => {
      const open = toggleList();
      if (open) {
        document.addEventListener('click', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
      } else {
        document.removeEventListener('click', closeOnOutsideClick);
        document.removeEventListener('keydown', closeOnEscape);
      }
    });
  }
})();

