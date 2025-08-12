// Header interactions: scroll state & mobile navigation
(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.nav-toggle');
  const drawer = header?.querySelector('.mobile-drawer');
  const navLinks = header?.querySelectorAll('.nav-link');
  if (!header || !toggle || !drawer) return;

  // Scroll listener (throttled with requestAnimationFrame)
  let lastY = 0;
  let ticking = false;
  const update = () => {
    const scrolled = lastY > 24;
    header.classList.toggle('is-scrolled', scrolled);
    if (scrolled) header.classList.remove('on-light');
    ticking = false;
  };
  const onScroll = () => {
    lastY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  // Detect light background sections
  const hero = document.querySelector('.hero');
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!header.classList.contains('is-scrolled')) {
          header.classList.toggle('on-light', !entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  // Mobile menu toggle with focus trap
  const focusableSelector = 'a[href], button:not([disabled])';
  let trapListener = null;

  const trapFocus = (e) => {
    const focusable = drawer.querySelectorAll(focusableSelector);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  };

  const openMenu = () => {
    header.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Menü schließen');
    trapListener = trapFocus;
    drawer.addEventListener('keydown', trapListener);
    const firstFocusable = drawer.querySelector(focusableSelector);
    firstFocusable?.focus();
  };

  const closeMenu = () => {
    header.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    if (trapListener) {
      drawer.removeEventListener('keydown', trapListener);
      trapListener = null;
    }
  };

  toggle.addEventListener('click', () => {
    const open = header.classList.contains('is-open');
    open ? closeMenu() : openMenu();
  });

  navLinks.forEach((link) =>
    link.addEventListener('click', () => {
      if (header.classList.contains('is-open')) closeMenu();
    }),
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
})();

