import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class Checkout {

    static cart = [];

    static async init () {
        await cartController.init();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        cartController.updateCart();
        this.links = document.querySelectorAll('.main-nav__link');
        goTopOnLoad.goToTopOnLoad();
        
    }
}

export default Checkout;