const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  function updateAriaLabel(open) {
    const langSuffix = document.documentElement.lang === "en" ? "En" : "De";
    const key = open ? `labelClose${langSuffix}` : `labelOpen${langSuffix}`;
    const label = toggle.dataset[key];
    if (label) {
      toggle.setAttribute("aria-label", label);
    }
  }

  function toggleMenu() {
    const open = links.classList.toggle("open");
    links.hidden = !open;
    toggle.setAttribute("aria-expanded", open);
    toggle.classList.toggle("open", open);
    updateAriaLabel(open);

    if (open) {
      document.addEventListener("click", closeOnOutsideClick);
      document.addEventListener("keydown", closeOnEscape);
    } else {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    }
  }

  function closeOnOutsideClick(e) {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      toggleMenu();
    }
  }

  function closeOnEscape(e) {
    if (e.key === "Escape") {
      toggleMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);
  updateAriaLabel(false);

  links.addEventListener("click", (e) => {
    if (e.target.matches("a") && links.classList.contains("open")) {
      toggleMenu();
    }
  });
}
