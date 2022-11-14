import http from '../clients/http.client.js'

class CartService {
    CART_URL = '/api/cart/'

    async saveCart(cart) {
        let savedCart = await http.postc(this.CART_URL, cart)
        return savedCart;
    }

    async loadCart() {
        let loadedCart = await http.get(this.CART_URL)
        return loadedCart;
    }

    async updateCart(cart, id) {
        let updatedCart = await http.putc(this.CART_URL, id, cart)
        return updatedCart;
    }
}

const cartService = new CartService()
export default cartService;