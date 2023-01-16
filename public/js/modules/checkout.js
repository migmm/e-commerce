import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class Checkout {

    static cart = [];

    static commonEvents() {

        const checkout = document.getElementsByClassName('cart-modal__footer__link-buy button-buy')[0]

        checkout.addEventListener('click', async e => {
            e.preventDefault();
            
            console.log('fdfddffdfdfd')

            const loggedIn = true;
            const user = 'arthemis';
            let savedCart = [];
            this.cart = []

            //const cartLoaded = await cartService.loadCart();
            localStorage.setItem('cart', JSON.stringify(savedCart));

          /*   if (loggedIn) {

                var index = cartLoaded.findIndex(item => item.userID === user);
                const userID = cartLoaded[index].id;
                savedCart.userID = user;
                savedCart.cartContent = this.cart;
                await cartService.updateCart(savedCart, userID);
            } */

            
        })
    }

    static async init() {
        await cartController.init();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        cartController.updateCart();
        this.links = document.querySelectorAll('.main-nav__link');
        goTopOnLoad.goToTopOnLoad();
        this.commonEvents();
    }
}

export default Checkout;