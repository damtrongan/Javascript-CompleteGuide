class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
  infor() {
    console.log(this.title + " " + this.price);
  }

  render() {
    const renderHook = document.getElementById("app");
    const productList = document.createElement("ul");
    productList.className = "product-list";
    const prodEl = document.createElement("li");
    prodEl.className = 'product-item'
    prodEl.innerHTML = ` 
    <div>
      <img src="${this.imageUrl}" alt="${this.title}" >
      <div class="product-item__content">
        <h2>${this.title}</h2>
        <h3>\$${this.price}</h3>
        <p>${this.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
    `;
    productList.append(prodEl);
    renderHook.append(productList);
  }
}

class ProductList {
  product = [
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
    )
  ]

  
}

product1.render();
product1.infor();
