import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const order = {};

  formData.forEach((value, key) => {
    order[key] = value;
  });

  return order;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => {
      return total + item.FinalPrice;
    }, 0);

    document.querySelector(`${this.outputSelector} #subtotal`).textContent =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = Number((this.itemTotal * 0.06).toFixed(2));
  
    const itemCount = this.list.length;
    this.shipping = 0;
  
    if (itemCount > 0) {
      this.shipping = 10 + (itemCount - 1) * 2;
    }
  
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }
  
  displayOrderTotals() {
    const summary = document.querySelector(this.outputSelector);
  
    summary.querySelector("#tax").textContent =
      `$${this.tax.toFixed(2)}`;
  
    summary.querySelector("#shipping").textContent =
      `$${this.shipping.toFixed(2)}`;
  
    summary.querySelector("#order-total").textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    try {
      this.list = getLocalStorage(this.key) || [];
      this.calculateItemSubTotal();
      this.calculateOrderTotal();
  
      if (this.list.length === 0) {
        throw new Error("Your cart is empty.");
      }
  
      const order = formDataToJSON(form);
  
      const [year, month] = order.expiration.split("-");
      order.expiration = `${Number(month)}/${year.slice(-2)}`;
  
      order.orderDate = new Date().toISOString();
      order.items = packageItems(this.list);
      order.orderTotal = this.orderTotal.toFixed(2);
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);
  
      const services = new ExternalServices();
      const response = await services.checkout(order);
      setLocalStorage(this.key, []);
      window.location.assign("/checkout/success.html");

      return response;
    } catch (error) {
      let message = error.message;
    
      if (typeof message === "object" && message !== null) {
        message = Object.values(message).join(" ");
      }
    
      alertMessage(message || "Unable to place your order. Please try again.");
      throw error;
    }
  }
}