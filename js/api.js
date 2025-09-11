const API_URL = "https://v2.api.noroff.dev/square-eyes";
const container = document.querySelector("#container");

export async function fetchAndRenderProducts(filterGenre = null) {
  try {
    container.innerHTML = "";
    const response = await fetch(API_URL);
    const data = await response.json();
    let products = data.data;

    if (filterGenre) {
      if (filterGenre === "on-sale") {
        products = products.filter((product) => product.onSale === true);
      } else {
        products = products.filter(
          (product) =>
            product.genre &&
            product.genre.toLowerCase() === filterGenre.toLowerCase()
        );
      }
    }

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
      const addToCartButton = document.createElement("button");

      card.className = "card";
      image.className = "card-image";
      content.className = "card-content";
      title.className = "card-title";
      genre.className = "card-genre";
      rating.className = "card-rating";
      price.className = "card-price";
      discountedPrice.className = "card-price-discount";
      addToCartButton.className = "add-button";
      anchor.href = `product/index.html?id=${product.id}`;
      anchor.textContent = "View Product";
      addToCartButton.textContent = "Add to cart";

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;

      genre.textContent = product.genre;
      rating.textContent = `⭐ ${product.rating}`;

      addToCartButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price || 0,
            img: product.image.url,
            quantity: 1,
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        addToCartButton.textContent = "Added!";
        setTimeout(() => (addToCartButton.textContent = "Add to cart"), 1000);
      });

      if (product.onSale === true) {
        price.textContent = `${product.discountedPrice} Kr`;
        price.style.color = "#4ade80";
      } else {
        price.textContent = `${product.price} Kr`;
      }

      content.appendChild(title);
      content.appendChild(rating);
      content.appendChild(price);
      content.appendChild(genre);
      content.appendChild(anchor);
      content.appendChild(addToCartButton);

      card.appendChild(image);
      card.appendChild(content);

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error, "Failed to fetch products");
    alert(
      "Something went wrong while loading products. PLease try again later"
    );
    container.textContent = "failed to load products";
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
    const addToCartButton = document.createElement("button");
    const buttonDiv = document.createElement("div");

    productDiv.className = "product-details";
    image.className = "product-image";
    infoDiv.className = "product-info";
    title.className = "product-title";
    description.className = "product-description";
    genre.className = "product-genre";
    rating.className = "product-rating";
    price.className = "product-price";
    discountedPrice.className = "product-price-discount";
    backButton.className = "back-button";
    addToCartButton.className = "add-button";
    buttonDiv.className = "product-button-div";

    image.src = product.image.url;
    image.alt = product.image.alt;
    title.textContent = product.title;
    description.textContent = product.description;
    genre.textContent = product.genre;
    rating.textContent = `⭐ ${product.rating}`;
    backButton.textContent = "Back to products";
    backButton.href = "../index.html";
    addToCartButton.textContent = "Add to cart";

    addToCartButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          id,
          title: product.title,
          price: product.price || 0,
          img: product.image?.url || "",
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      addToCartButton.textContent = "Added!";
      setTimeout(() => (addToCartButton.textContent = "Add to cart"), 1000);
    });

    if (product.onSale === true) {
      price.textContent = `${product.discountedPrice} Kr`;
      price.style.color = "#4ade80";
    } else {
      price.textContent = `${product.price} Kr`;
    }

    productDiv.appendChild(image);
    infoDiv.appendChild(title);
    infoDiv.appendChild(genre);
    infoDiv.appendChild(description);
    infoDiv.appendChild(rating);
    infoDiv.appendChild(price);
    buttonDiv.append(addToCartButton, backButton);
    infoDiv.appendChild(buttonDiv);

    container.appendChild(productDiv);
    container.appendChild(infoDiv);
  } catch (error) {
    console.error(error, "failed to fetch data");
    alert(
      "Something went wrong while loading the product. please try again later"
    );
    container.textContent = "failed to load product";
  }
}
