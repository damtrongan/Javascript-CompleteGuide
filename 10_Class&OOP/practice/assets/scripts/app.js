class ElementAttribute {
  constructor(attrName, attrValue) {
    this.attrName = attrName;
    this.attrValue = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      rootElement.className = cssClass;
    }
    if (attributes && attributes.lenght > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem extends Component {
  constructor(renderHook, product) {
    super(renderHook);
    this.product = product;
  }

  addToCart() {
    console.log("Adding product to card");
    App.addCart(this.product);
  }

  render() {
    // const prodEl = document.createElement("li");
    // prodEl.className = "product-item";
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "A Pillow",
      "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      "A carpet which you might like - or not.",
      89.99
    ),
  ];

  constructor(hookId){
    super(hookId);
  }
  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    //prodList.id = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem("prod-list", prod);
      productItem.render();
    }
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }
  constructor(renderHookId) {
    super(renderHookId);
  }
  addProduct(product) {
    const updateProduct = [...this.items];
    updateProduct.push(product);
    this.cartItems = updateProduct;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$${0} </h2>
    <button>Order</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class Shop extends Component {
  render() {
    this.cart = new ShoppingCart("app");
    this.cart.render();

    const productList = new ProductList("app");
    productList.render();
  }
}

class App {
  //static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
