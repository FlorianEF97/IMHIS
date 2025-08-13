const toggleSellers = document.getElementById('toggle-sellers');
const sellerList = document.getElementById('seller-list');

if (toggleSellers && sellerList) {
  toggleSellers.addEventListener('click', () => {
    const open = sellerList.classList.toggle('open');
    toggleSellers.setAttribute('aria-expanded', open);
    sellerList.hidden = !open;
  });
}
