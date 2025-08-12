const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  const linkItems = links.querySelectorAll("a");

  const toggleMenu = () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.classList.toggle("open", open);
  };

  toggle.addEventListener("click", toggleMenu);

  linkItems.forEach((link) =>
    link.addEventListener("click", () => {
      if (links.classList.contains("open")) {
        toggleMenu();
      }
    }),
  );
}
