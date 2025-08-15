const langButton = document.getElementById("language-toggle");

function setLanguage(lang) {
  const english = lang === "en";
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-de").forEach((el) => {
    el.hidden = english;
  });
  document.querySelectorAll(".lang-en").forEach((el) => {
    el.hidden = !english;
  });

  if (langButton) {
    langButton.setAttribute("aria-label", english ? "Deutsch" : "English");
  }

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    const suffix = english ? "En" : "De";
    const open = navToggle.classList.contains("open");
    const key = open ? `labelClose${suffix}` : `labelOpen${suffix}`;
    const label = navToggle.dataset[key];
    if (label) {
      navToggle.setAttribute("aria-label", label);
    }
  }

  document.querySelectorAll("[data-alt-en]").forEach((img) => {
    if (!img.dataset.altDe) {
      img.dataset.altDe = img.getAttribute("alt") || "";
    }
    const value = english ? img.dataset.altEn : img.dataset.altDe;
    img.setAttribute("alt", value);
  });
}

langButton?.addEventListener("click", () => {
  const newLang = document.documentElement.lang === "de" ? "en" : "de";
  setLanguage(newLang);
});

setLanguage("de");

