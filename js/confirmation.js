// Generate order ID

export function orderId() {
  const randomNumber = document.querySelector("#random-number");
  const id = Math.floor(Math.random() * 100000000);
  randomNumber.textContent = `#${id}`;
  console.log(id);
}

orderId();
