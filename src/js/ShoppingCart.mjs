import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  updateCartCount,
} from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button
      type="button"
      class="cart-card__remove"
      data-id="${item.Id}"
      aria-label="Remove ${item.Name} from cart"
    >×</button>

    <a href="../product_pages/?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images?.PrimaryMedium ?? item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const cartItems = getLocalStorage("so-cart") || [];
    this.renderList(cartItems);
  }

  calculateSubtotal(cartItems) {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.FinalPrice;
    }, 0);
  
    document.querySelector("#cart-subtotal").textContent =
      `$${subtotal.toFixed(2)}`;
  }

  renderList(cartItems) {
    this.calculateSubtotal(cartItems);
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true,
    );

    const removeButtons =
      this.listElement.querySelectorAll(".cart-card__remove");

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.dataset.id;
        const storedCart = getLocalStorage("so-cart") || [];
        const itemIndex = storedCart.findIndex((item) => item.Id === productId);
      
        if (itemIndex !== -1) {
          storedCart.splice(itemIndex, 1);
          setLocalStorage("so-cart", storedCart);
          this.renderList(storedCart);
          updateCartCount();
        }
      });
    });
  }
}
