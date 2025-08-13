const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  function toggleMenu() {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");

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

  links.addEventListener("click", (e) => {
    if (e.target.matches("a") && links.classList.contains("open")) {
      toggleMenu();
    }
  });
}
