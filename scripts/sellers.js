const toggleSellers = document.getElementById("toggle-sellers");
const sellerList = document.getElementById("seller-list");

if (toggleSellers && sellerList) {
  const toggleList = () => {
    const open = sellerList.classList.toggle("open");
    toggleSellers.setAttribute("aria-expanded", open);
    sellerList.hidden = !open;
    return open;
  };

  const closeOnOutsideClick = (e) => {
    if (
      sellerList.classList.contains("open") &&
      !sellerList.contains(e.target) &&
      !toggleSellers.contains(e.target)
    ) {
      toggleList();
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === "Escape" && sellerList.classList.contains("open")) {
      toggleList();
    }
  };

  toggleSellers.addEventListener("click", () => {
    const open = toggleList();
    if (open) {
      document.addEventListener("click", closeOnOutsideClick);
      document.addEventListener("keydown", closeOnEscape);
    } else {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    }
  });
}
