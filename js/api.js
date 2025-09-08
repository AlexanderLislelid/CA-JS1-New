const API_URL = "https://v2.api.noroff.dev/square-eyes";
const container = document.querySelector("#container");
export async function fetchAndRenderProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    products.forEach((product) => {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("h2");
      const genre = document.createElement("p");
      const rating = document.createElement("p");
      const price = document.createElement("p");
      const discountedPrice = document.createElement("p");
      const anchor = document.createElement("a");

      card.className = "card";
      image.className = "card-image";
      content.className = "card-content";
      title.className = "card-title";
      genre.className = "card-genre";
      rating.className = "card-rating";
      price.className = "card-price";
      discountedPrice.className = "card-price-discount";
      anchor.href = `product/index.html?id=${product.id}`;

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;

      genre.textContent = product.genre;
      rating.textContent = `User rating: ${product.rating}`;

      if (product.onSale === true) {
        price.textContent = `On sale: ${product.discountedPrice} Kr`;
      } else {
        price.textContent = `${product.price} Kr`;
      }
      content.appendChild(title);
      content.appendChild(rating);
      content.appendChild(price);
      content.appendChild(genre);
      card.appendChild(image);
      card.appendChild(content);
      anchor.appendChild(card);
      container.appendChild(anchor);
    });
  } catch (error) {
    console.error(error, "Failed to fetch products");
  }
}

export async function fetchAndCreateProduct() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID provided";
      return;
    }
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const product = data.data;

    const productDiv = document.createElement("div");
    const image = document.createElement("img");
    const infoDiv = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const genre = document.createElement("p");
    const rating = document.createElement("p");
    const price = document.createElement("p");
    const discountedPrice = document.createElement("p");
    const backButton = document.createElement("a");

    productDiv.className = "product-details";
    image.className = "product-image";
    infoDiv.classname = "product-info";
    title.className = "product-title";
    description.className = "product-description";
    genre.className = "product-genre";
    rating.className = "product-rating";
    price.className = "product-price";
    discountedPrice.className = "product-price-discount";
    backButton.className = "back-button";

    image.src = product.image.url;
    image.alt = product.image.alt;
    title.textContent = product.title;
    description.textContent = product.description;
    genre.textContent = product.genre;
    rating.textContent = product.rating;
    backButton.textContent = "back to products";
    backButton.href = "../index.html";

    if (product.onSale === true) {
      price.textContent = `On sale: ${product.discountedPrice} Kr`;
    } else {
      price.textContent = `${product.price} Kr`;
    }

    productDiv.appendChild(image);
    infoDiv.appendChild(title);
    infoDiv.appendChild(description);
    infoDiv.appendChild(genre);
    infoDiv.appendChild(rating);
    infoDiv.appendChild(price);
    infoDiv.appendChild(backButton);

    container.appendChild(productDiv);
    container.appendChild(infoDiv);
  } catch (error) {
    console.error(error, "failed to fetch data");
  }
}
