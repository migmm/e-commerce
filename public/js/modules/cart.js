import cartService from '../services/cart.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/utils/toast.js';
import render from '/js/utils/render.js';

console.log('🆗: Módulo ModuleCart cargado.');

class ModuleCart {

    static cart = [];

    static cartFunctions() {

        const backgroundDark = document.querySelector('.background-dark');
        const cartPreview = document.querySelector('.cart-modal');
        let isCartPreviewOpen = 0;


        function toggleCart() {
            backgroundDark.classList.toggle('background-dark--hidden');
            cartPreview.classList.toggle('cart-modal--opendrawer');
        }

        // ¯\_(ツ)_/¯
        document.addEventListener('click', e => {

            // Click on background dark and cart is closed
            if (e.target.classList.value === 'background-dark') {
                toggleCart();
                isCartPreviewOpen = 0;
                return;
            }

            // Click on cart button to show cart preview
            if (e.target.classList.value === 'fa fa-shopping-basket fa-lg') {
                toggleCart();
                isCartPreviewOpen = 1;
                return;
            }

            // Click on badge to show cart preview
            if (e.target.classList.value === 'main-header__wrapper__cart-button-container__qty-cart') {
                toggleCart();
                isCartPreviewOpen = 1;
                return;
            }

            // Click on X button to close cart preview
            if (e.target.classList.value === 'fa fa-times-circle-o fa-2x') {
                toggleCart();
                isCartPreviewOpen = 0;
                return;
            }

            // Click on "Seguir comprando" button to close cart preview
            if (e.target.classList.value === 'cart-modal__footer__link-keep') {
                toggleCart();
                isCartPreviewOpen = 0;
                return;
            }

            // Click on "Agregar al carrito"
            if (e.target.classList.value === 'card__link') {
                e.preventDefault();
                let id = e.target.getAttribute("data-id");
                ModuleCart.addItemToCart(id);
                return;
            }

            // Click on trash icon to delete product from cart
            if (e.target.classList.value === 'fa fa-trash-o') {
                e.preventDefault();
                let id = e.target.getAttribute('data-id');
                ModuleCart.removeItemFromCart(id)
                return;
            }

            // Click on plus icon to increase product quantity in cart to the maximum stock
            if (e.target.classList.value === 'fa fa-plus') {
                
                let btnPlus = e.target.previousElementSibling.value;
                const maxStock= parseInt(e.target.parentNode.parentNode.previousElementSibling.value);
                const id = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute("data-id");
                btnPlus = parseInt(btnPlus);

                if (btnPlus >= maxStock) {
                    e.target.classList.add('plus-and-minus-deactivated');
                    return;
                } else {
                    e.target.classList.remove('plus-and-minus-deactivated');
                }

                btnPlus++;
                this.addItemToCart(id);
                return;
            }

            // Click on minus icon to decrease product quantity in cart to the minimum stock
            if (e.target.classList.value === 'fa fa-minus') {

                let btnMinus = e.target.nextElementSibling.value;
                const id = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute("data-id");
                btnMinus = parseInt(btnMinus);

                if (btnMinus <= 1) {
                    e.target.classList.add('plus-and-minus-deactivated');
                    return;
                } else {
                    e.target.classList.remove('plus-and-minus-deactivated');
                }
                
                btnMinus--;
                this.removeItemFromCart(id, 1);
                return;
            }

            document.addEventListener('keydown', e => {
                if (e.key == 'Escape') {
                    if (isCartPreviewOpen) {
                        toggleCart();
                        isCartPreviewOpen = 0;
                    }
                }
            });
        });
    }

    static async addItemToCart(id) {
        const products = await productController.getProducts();
        const product = products.find(product => product.id == id)
        const productToRemoveId = this.cart.findIndex(product => product.id == id)

        if (productToRemoveId >= 0) {
            ++this.cart[productToRemoveId].qty;
            if (document.getElementsByClassName('checkout__products')[0]) {
                await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
            }
            await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
            localStorage.setItem('cart', JSON.stringify(this.cart));
            toastComponent.toastNotification("Producto agregado al carrito!");
            ModuleCart.updateCart();
            return;
        }

        this.cart.push(product);
        this.cart[this.cart.length - 1].qty = 1;
        if (document.getElementsByClassName('checkout__products')[0]) {
            await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        }
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
        localStorage.setItem('cart', JSON.stringify(this.cart));
        toastComponent.toastNotification("Producto agregado al carrito!");
        ModuleCart.updateCart();
    }

    static async removeItemFromCart(id, qty) {

        const productToRemoveId = this.cart.findIndex(product => product.id == id)

        if (qty === 1) {
            --this.cart[productToRemoveId].qty;
            if (document.getElementsByClassName('checkout__products')[0]) {
                await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
            }

            await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
            localStorage.setItem('cart', JSON.stringify(this.cart));
            toastComponent.toastNotification("Producto eliminado del carrito!");
            ModuleCart.updateCart();
            return;
        }

        this.cart.splice(productToRemoveId, 1);
        if (document.getElementsByClassName('checkout__products')[0]) {
            await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        }
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
        localStorage.setItem('cart', JSON.stringify(this.cart));
        toastComponent.toastNotification("Producto eliminado del carrito!");
        ModuleCart.updateCart();
    }

    static async updateCart() {
        let badgeQtyCounter = document.getElementsByClassName('main-header__wrapper__cart-button-container__qty-cart')[0];
        let partialPrice = document.getElementsByClassName('card-cart-preview__price__price-subtotal');
        let cartTotal = document.getElementsByClassName('cart-total');

        badgeQtyCounter.innerHTML = 0;
        cartTotal[0].innerHTML = 0;

        for (let i = 0; i <= partialPrice.length -1; ++i) {
            cartTotal[0].innerHTML = parseInt(cartTotal[0].innerHTML) + parseInt(partialPrice[i].innerHTML)
        }

        for (let i = 0; i <= this.cart.length - 1; ++i) {
            badgeQtyCounter.innerHTML = parseInt(badgeQtyCounter.innerHTML) + parseInt(this.cart[i].qty);
        }

        if (badgeQtyCounter.innerHTML > '0') {
            badgeQtyCounter.classList.add("visible");

        } else {
            badgeQtyCounter.classList.remove("visible");
        }

        const cartLoaded = await cartService.loadCart();

        const loggedIn = true;
        const user = 'arthemis';
        let savedCart = {};

        if (loggedIn) {

            var index = cartLoaded.findIndex(item => item.userID === user);
            const userID = cartLoaded[index].id;
            savedCart.userID = user;
            savedCart.cartContent = this.cart;
            await cartService.updateCart(savedCart, userID);
        }
    }

    static async init() {
        console.log('ModuleCart.init()');
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
        ModuleCart.updateCart();
    }
}

export default ModuleCart;
