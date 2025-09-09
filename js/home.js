import { fetchAndRenderProducts } from "./api.js";
import { renderCart, clearCart } from "./cart.js";

fetchAndRenderProducts();
renderCart();

const cartBtn = document.getElementById("cart");
const overlay = document.getElementById("cart-overlay");
const closeBtn = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
  overlay.classList.add("open");
  renderCart();
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("open");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("open");
  }
});

const clearBtn = document.querySelector("#clear-cart");
clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearCart();
  renderCart();
});
