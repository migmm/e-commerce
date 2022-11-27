import http from '../clients/http.client.js'

class CartService {
    CART_URL = '/api/cart/';
    mode = 'json';

    async saveCart(cart, mode) {
        let savedCart = await http.post(this.CART_URL, cart, mode);
        return savedCart;
    }

    async loadCart() {
        let loadedCart = await http.get(this.CART_URL);
        return loadedCart;
    }

    async updateCart(cart, id, mode) {
        let updatedCart = await http.put(this.CART_URL, id, cart, mode);
        return updatedCart;
    }
}

const cartService = new CartService();
export default cartService;