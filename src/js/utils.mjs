export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template;
  if(callback){
    callback(data);
  }

}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement, undefined, updateCartCount);
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const badge = document.querySelector(".cart-count");

  if (badge) {
    badge.textContent = cartItems.length;
  }
}
