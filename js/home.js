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

//-----------Filtering

const filterAll = document.querySelector(".all");
const filterAction = document.querySelector(".action");
const filterKids = document.querySelector(".kids");
const filterComedy = document.querySelector(".comedy");
const filterDrama = document.querySelector(".drama");
const filterHorror = document.querySelector(".horror");
const filterOnSale = document.querySelector(".on-sale");

filterAll.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts();
});

filterAction.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("Action");
});

filterKids.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("Kids");
});

filterHorror.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("Horror");
});

filterComedy.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("Comedy");
});

filterDrama.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("Drama");
});

filterOnSale.addEventListener("click", (event) => {
  event.preventDefault();
  fetchAndRenderProducts("on-sale");
});
