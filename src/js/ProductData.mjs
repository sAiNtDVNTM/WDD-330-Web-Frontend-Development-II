function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();

    console.log("Product ID from URL:", id);
    console.log("First product ID in JSON:", products[0].Id);
    console.log("Product ID type:", typeof id);
    console.log("JSON ID type:", typeof products[0].Id);

    return products.find((item) => item.Id === id);
  }
}
