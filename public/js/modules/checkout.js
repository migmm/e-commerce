import cartController from '/js/modules/cart.js';
import cartService from '../services/cart.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/utils/toast.js';
import render from '/js/utils/render.js';

console.log('🆗: Módulo Checkout cargado.');

class Checkout {

    static cart = [];

    static goToTopOnLoad() {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.classList.remove('scroll-smooth');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        htmlTag.classList.add('scroll-smooth');
    }

    static async init () {
        console.log('Checkout.init()');
        await cartController.init();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        cartController.updateCart();
        this.links = document.querySelectorAll('.main-nav__link');
        Checkout.goToTopOnLoad();
        
    }
}

export default Checkout;