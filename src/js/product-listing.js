import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";


const element = document.querySelector(".product-list");

const category = getParam("category");
const dataSource = new ExternalServices();

const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

document.querySelector("#category-title").textContent =
  `Top Products: ${categoryNames[category]}`;

const productList = new ProductList(category, dataSource, element);

productList.init().catch(() => {
  element.textContent = "Unable to load products. Please try again.";
});


loadHeaderFooter();


