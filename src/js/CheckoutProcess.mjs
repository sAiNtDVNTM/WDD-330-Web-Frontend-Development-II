const subtotal = 0;

export default class CheckoutProcess {

   constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
   
    async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    
  }
   
    calculateDisplaySubtotal() {
        for (const item in product) {
            let price = product.FinalPrice;
            subtotal += price;
        }
        document.getElementById("subtotal").textContent = subtotal;
    }

}