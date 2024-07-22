class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}

class ECommerceStore {
    constructor() {
        this.products = [];
        this.shoppingCart = [];
        this.userPreferences = {
            shippingAddress: '',
            recentlyViewed: []
        };
    }

    addProduct(id, name, price, stock) {
        this.products.push(new Product(id, name, price, stock));
        this.renderProducts();
    }

    addToCart(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.stock >= quantity) {
            const cartItem = this.shoppingCart.find(item => item.product.id === productId);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.shoppingCart.push(new ShoppingCartItem(product, quantity));
            }
            product.stock -= quantity;
            console.log(`${quantity} ${product.name}(s) added to the cart.`);
            this.renderCart();
        } else {
            console.log(`Sorry, we don't have enough stock for ${product.name}.`);
        }
    }

    removeFromCart(productId, quantity) {
        const cartItem = this.shoppingCart.find(item => item.product.id === productId);
        if (cartItem && cartItem.quantity >= quantity) {
            cartItem.quantity -= quantity;
            cartItem.product.stock += quantity;
            console.log(`${quantity} ${cartItem.product.name}(s) removed from the cart.`);
            if (cartItem.quantity === 0) {
                this.shoppingCart = this.shoppingCart.filter(item => item.product.id !== productId);
            }
            this.renderCart();
        } else {
            console.log(`You don't have that many ${cartItem.product.name}(s) in your cart.`);
        }
    }

    calculateTotal() {
        return this.shoppingCart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    }

    setShippingAddress(address) {
        this.userPreferences.shippingAddress = address;
        console.log(`Shipping address set to: ${address}`);
    }

    addRecentlyViewed(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            if (!this.userPreferences.recentlyViewed.includes(productId)) {
                this.userPreferences.recentlyViewed.push(productId);
            }
            console.log(`Recently viewed: ${product.name}`);
        }
    }

    updateStock(productId, newStock) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock = newStock;
            console.log(`Stock updated for ${product.name}. New stock: ${newStock}`);
            this.renderProducts();
        }
    }

    notifyPromotion(productId, discount) {
        setTimeout(() => {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                console.log(`Promotion! Get ${discount}% off on ${product.name}!`);
            }
        }, 5000); // Notify after 5 seconds
    }

    renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        this.products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${product.name} - $${product.price} (Stock: ${product.stock})</span>
                <button onclick="store.addToCart(${product.id}, 1)">Add to Cart</button>
            `;
            productList.appendChild(li);
        });
    }

    renderCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        this.shoppingCart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.product.name} - $${item.product.price} x ${item.quantity}</span>
                <button onclick="s
