import { getCart, clearCart } from "./cart.js";

function renderCheckout() {
  const container = document.getElementById("checkout-container");
  const totalDisplay = document.getElementById("checkout-total");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.textContent = "Shopping cart is empty.";
    if (totalDisplay) totalDisplay.textContent = "";
    return;
  }

  cart.forEach((product) => {
    const itemDiv = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const qty = document.createElement("p");

    itemDiv.className = "checkout-item";
    title.className = "checkout-title";
    price.className = "checkout-price";
    qty.className = "checkout-qty";

    const q = Number(product.quantity || 1);
    const p = Number(product.price || 0);

    title.textContent = product.title;
    price.textContent = `${p} Kr`;
    qty.textContent = `x ${q}`;

    itemDiv.append(title, price, qty);
    container.appendChild(itemDiv);

    total += p * q;
  });
  if (totalDisplay) {
    totalDisplay.textContent = `Total: ${total} Kr`;
  }
}
renderCheckout();

const form = document.forms["checkout-form"];
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearCart();
    renderCheckout();
    window.location.href = "../checkout/confirmation/index.html";
  });
}
