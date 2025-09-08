export function renderCart() {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  const container = document.getElementById("cart-container");
  const sumEl = document.getElementById("cart-sum");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.textContent = "Your cart is empty.";
    sumEl.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const line = document.createElement("div");
    line.className = "cart-item";
    line.textContent = `${item.title} – ${item.price} Kr x ${item.quantity}`;
    container.appendChild(line);

    total += item.price * item.quantity;
  });

  sumEl.textContent = `Total: ${total} Kr`;
}
