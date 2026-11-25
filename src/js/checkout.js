import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "#order-summary");
checkout.init();

const zipInput = document.querySelector("#zip");

zipInput.addEventListener("change", () => {
  if (zipInput.checkValidity()) {
    checkout.calculateOrderTotal();
  }
});