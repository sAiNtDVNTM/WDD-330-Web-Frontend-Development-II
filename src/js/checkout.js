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

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await checkout.checkout(form);
    console.log("Server response:", response);
  } catch (error) {
    console.error("Checkout error:", error.message);
  } finally {
    submitButton.disabled = false;
  }
});