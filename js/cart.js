export function deleteFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function renderCart() {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  const container = document.getElementById("cart-container");
  const sum = document.getElementById("cart-sum");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.textContent = "Your cart is empty.";
    sum.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.textContent = `${item.title} - ${item.price} Kr x ${item.quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      deleteFromCart(item.id);
      renderCart();
    };
    cartItem.appendChild(removeBtn);
    container.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  sum.textContent = `Total: ${total.toFixed(2)} Kr`;
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function clearCart() {
  localStorage.clear("cart");
}
