import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";


function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
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

      renderList(cartItems) {
        renderListWithTemplate(
          cartItemTemplate,
          this.listElement,
          cartItems,
          "afterbegin",
          true,
        );
      }
  }