import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class Checkout {

    static cart = [];

    static commonEvents() {
        const checkout = document.getElementsByClassName('cart-modal__footer__link-buy button-buy')[0];
        let partialPrice = document.getElementsByClassName('card-cart-preview__price__price-subtotal');
        let favsTotal = document.getElementsByClassName('checkout__final');
        const modalOk = document.getElementsByClassName('main-content__modal-thanks-container')[0];

        favsTotal[0].innerHTML = 0;

        for (let i = 0; i <= partialPrice.length - 1; ++i) {
            favsTotal[0].innerHTML = parseInt(favsTotal[0].innerHTML) + parseInt(partialPrice[i].innerHTML);
        }

        checkout.addEventListener('click', async e => {
            e.preventDefault();

            localStorage.setItem('cart', JSON.stringify([]));

            modalOk.classList.add("visible-flex");
            function timedRedirect() {
                modalOk.classList.remove("visible-flex");
                location.href = '#'
            }

            setTimeout(timedRedirect, 3000);
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