// Generate order ID

function orderId() {
  const randomNumber = document.querySelector("#random-number");
  const id = Math.floor(Math.random() * 100000000);
  randomNumber.textContent = `#${id}`;
  console.log(id);
}

orderId();

// add to order history ?

let orderHistory = [];
