export function openCart() {
  const cartBtn = document.querySelector("#cart");
  const cartContainer = document.querySelector("#cart-container");

  cartBtn.addEventListener("click", () => {
    if (cartContainer.style.display === "block") {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "block";
      renderCart();
    }
  });
}

export function renderCart() {
  const container = document.querySelector("#cart-container");
  container.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.textContent = "Shopping cart is empty.";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    const content = document.createElement("div");
    const title = document.createElement("p");
    const price = document.createElement("p");
    const removeBtn = document.createElement("button");

    content.className = "cart-item";
    title.textContent = product.title;
    price.textContent = `${product.price} Kr x ${product.quantity}`;
    removeBtn.textContent = "Remove from cart";

    // -------remove product
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    content.append(title, price, removeBtn);
    container.appendChild(content);

    total += product.price * product.quantity;
  });

  const totalEl = document.createElement("p");
  totalEl.textContent = `Total: ${total} Kr`;
  container.appendChild(totalEl);
}

export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
