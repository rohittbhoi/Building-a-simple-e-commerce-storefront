// Product class to represent individual products
class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

// ShoppingCartItem class to represent items in the shopping cart
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}

// ECommerceStore class to manage products, shopping cart, and user preferences
class ECommerceStore {
    constructor() {
        this.products = [];
        this.shoppingCart = [];
        this.userPreferences = {
            shippingAddress: '',
            recentlyViewed: []
        };
    }

    // Method to add a product to the store
    addProduct(id, name, price, stock) {
        this.products.push(new Product(id, name, price, stock));
    }

    // Method to add an item to the shopping cart
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
        } else {
            console.log(`Sorry, we don't have enough stock for ${product.name}.`);
        }
    }

    // Method to remove an item from the shopping cart
    removeFromCart(productId, quantity) {
        const cartItem = this.shoppingCart.find(item => item.product.id === productId);
        if (cartItem && cartItem.quantity >= quantity) {
            cartItem.quantity -= quantity;
            cartItem.product.stock += quantity;
            console.log(`${quantity} ${cartItem.product.name}(s) removed from the cart.`);
            if (cartItem.quantity === 0) {
                this.shoppingCart = this.shoppingCart.filter(item => item.product.id !== productId);
            }
        } else {
            console.log(`You don't have that many ${cartItem.product.name}(s) in your cart.`);
        }
    }

    // Method to calculate the total cost of items in the shopping cart
    calculateTotal() {
        return this.shoppingCart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    }

    // Method to set the user's shipping address
    setShippingAddress(address) {
        this.userPreferences.shippingAddress = address;
        console.log(`Shipping address set to: ${address}`);
    }

    // Method to add a recently viewed product
    addRecentlyViewed(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            if (!this.userPreferences.recentlyViewed.includes(productId)) {
                this.userPreferences.recentlyViewed.push(productId);
            }
            console.log(`Recently viewed: ${product.name}`);
        }
    }

    // Method to update the stock of a product
    updateStock(productId, newStock) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock = newStock;
            console.log(`Stock updated for ${product.name}. New stock: ${newStock}`);
        }
    }

    // Method to notify promotion with a delay
    notifyPromotion(productId, discount) {
        setTimeout(() => {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                console.log(`Promotion! Get ${discount}% off on ${product.name}!`);
            }
        }, 5000); // Notify after 5 seconds
    }
}

// Example usage
const store = new ECommerceStore();

// Adding products to the store
store.addProduct(1, 'T-Shirt', 19.99, 100);
store.addProduct(2, 'Jeans', 49.99, 50);
store.addProduct(3, 'Sneakers', 79.99, 30);
store.addProduct(4, 'Jacket', 99.99, 20);

// User sets shipping address
store.setShippingAddress('123 Main St, Anytown, USA');

// User views some products
store.addRecentlyViewed(1);
store.addRecentlyViewed(2);

// User adds items to the cart
store.addToCart(1, 2);
store.addToCart(3, 1);

// Display shopping cart and total
console.log('Shopping Cart:', store.shoppingCart);
console.log('Total:', store.calculateTotal());

// User removes an item from the cart
store.removeFromCart(1, 1);
console.log('Shopping Cart:', store.shoppingCart);
console.log('Total:', store.calculateTotal());

// Real-time stock update
store.updateStock(2, 100);

// Delayed promotion notification
store.notifyPromotion(4, 20);
