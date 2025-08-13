const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  const linkItems = links.querySelectorAll("a");

  const toggleMenu = () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  };

  toggle.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    if (
      links.classList.contains("open") &&
      !links.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      toggleMenu();
    }
  });

    linkItems.forEach((link) =>
      link.addEventListener("click", () => {
        if (links.classList.contains("open")) {
          toggleMenu();
        }
      })
    );
}
