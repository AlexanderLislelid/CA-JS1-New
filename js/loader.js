export function showLoader() {
  const loader = document.querySelector(".loader");

  loader.hidden = false;
}

export function hideLoader() {
  const loader = document.querySelector(".loader");

  loader.hidden = true;
}
