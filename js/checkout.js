import { getCart, clearCart, renderCart } from "./cart.js";

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
  renderCheckout();
});
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

    title.textContent = `${product.title} -`;
    price.textContent = `${p} Kr`;
    qty.textContent = `x ${q}`;

    itemDiv.append(title, price, qty);
    container.appendChild(itemDiv);

    total += p * q;
  });
  if (totalDisplay) {
    totalDisplay.textContent = `Total: ${total.toFixed(2)} Kr`;
  }
}
renderCheckout();

//------------------------form validation
function validateForm() {
  let firstName = form["fname"].value;
  let lastName = form["lname"].value;
  let adress = form["adress"].value;
  let country = form["country"].value;
  let zip = form["zip"].value;
  let cardType = form["payment"].value;
  let cardNumber = form["cardnumber"].value;
  let cvc = form["cvc"].value;

  if (firstName == "") {
    alert("Name must be filled out!");
    return false;
  } else if (lastName == "") {
    alert("Name must be filled out!");
    return false;
  } else if (adress == "") {
    alert("Adress must be filled out!");
    return false;
  } else if (country == "") {
    alert("Choose your country");
    return false;
  } else if (zip == "" || isNaN(zip)) {
    alert("Enter your zip-code");
    return false;
  } else if (cardType == "") {
    alert("Choose your card type");
    return false;
  } else if (cardNumber == "" || isNaN(cardNumber)) {
    alert("Enter your card-number");
    return false;
  } else if (cvc == "" || isNaN(cvc)) {
    alert("Enter CVC");
    return false;
  } else {
    return true;
  }
}

const form = document.forms["checkout-form"];
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      window.location.href = "../checkout/confirmation/index.html";
      clearCart();
      renderCheckout();
    }
  });
}
