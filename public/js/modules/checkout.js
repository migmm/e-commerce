import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class Checkout {

    static cart = [];

    static commonEvents() {

        // this.cart = JSON.parse(localStorage.getItem('cart')) || [];

        const checkout = document.getElementsByClassName('cart-modal__footer__link-buy button-buy')[0];
        const modalOk = document.getElementsByClassName('main-content__modal-thanks-container')[0];
        let chekoutTotal = document.getElementsByClassName('checkout__total');
        let partialPrice = document.getElementsByClassName('card-checkout-preview__price__price-subtotal');


        chekoutTotal[0].innerHTML = 0;

        for (let i = 0; i <= partialPrice.length - 1; ++i) {
            chekoutTotal[0].innerHTML = parseInt(chekoutTotal[0].innerHTML) + parseInt(partialPrice[i].innerHTML)
        }

        checkout.addEventListener('click', async e => {
            e.preventDefault();

            const loggedIn = true;
            const user = 'arthemis';
            let savedCart = [];
            this.cart = []

            //const cartLoaded = await cartService.loadCart();
            localStorage.setItem('cart', JSON.stringify(savedCart));

            modalOk.classList.add("visible-flex");
            function timedRedirect() {
                modalOk.classList.remove("visible-flex");
                location.href = '#'
            }

            setTimeout(timedRedirect, 3000);

            /*   if (loggedIn) {
    
                    var index = cartLoaded.findIndex(item => item.userID === user);
                    const userID = cartLoaded[index].id;
                    savedCart.userID = user;
                    savedCart.cartContent = this.cart;
                    await cartService.updateCart(savedCart, userID);
                } 
            */

        })
    }

    static async init() {
        await cartController.init();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-checkout-preview.hbs', '.checkout__products')
        cartController.updateCart();
        this.links = document.querySelectorAll('.main-nav__link');
        goTopOnLoad.goToTopOnLoad();
        this.commonEvents();
    }
}

export default Checkout;