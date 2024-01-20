import cartService from '../services/cart.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/utils/toast.js';
import render from '/js/utils/render.js';

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
                this.addItemToCart(id);
                return;
            }

            // Click on trash icon to delete product from cart
            if (e.target.classList.value === 'fa fa-trash-o') {
                e.preventDefault();
                let id = e.target.getAttribute('data-id');
                this.removeItemFromCart(id)
                return;
            }

            // Click on plus icon to increase product quantity in cart to the maximum stock
            if (e.target.classList.value === 'qty-selector-container__btn-plus') {

                const inputStock = e.target.previousElementSibling;
                const id = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute("data-id");

                inputStock.value++
                this.addItemToCart(id);
                return;
            }

            // Click on minus icon to decrease product quantity in cart to the minimum stock
            if (e.target.classList.value === 'qty-selector-container__btn-minus') {

                const inputStock = e.target.nextElementSibling;
                const id = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute("data-id");

                inputStock.value--
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
        const currentLang = localStorage.getItem('langSelection') || 'en';
        const currency = localStorage.getItem('currency') || 'usd';
    
        let query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=_id&value=${id}&currency=${currency}`;
        const product = await productController.getProducts(currentLang, query);
    
        const existingCartItem = this.cart.find(item => item.id === id); 
        
        if (existingCartItem) {
            if (existingCartItem.qty < existingCartItem.stock) {
                existingCartItem.qty++;

                localStorage.setItem('cart', JSON.stringify(this.cart));
            } else {
                toastComponent.toastNotification('toast-error-stock-exceeded', 'error', '#FF0000', 'center');
            }

        } else if (product) {
            const { id, productName, images, urlName, price, discountPercent, stock } = product.products[0];
    
            const cartItem = {
                id: id,
                productName: productName,
                image: images[0],
                urlName: urlName,
                price: price,
                discountPercent: discountPercent,
                stock: stock,
                qty: 1
            };
    
            this.cart.push(cartItem);
    
            localStorage.setItem('cart', JSON.stringify(this.cart));
        } else {
            toastComponent.toastNotification('toast-error-added-to-cart', 'error', '#FF0000', 'center');
        }
    
        this.updateCart();
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
    }
    
    static totaCartItems(cart) {
        let totalQuantity = 0;

        for (const item of cart) {
            const qty = parseInt(item.qty, 10);

            if (!isNaN(qty)) {
                totalQuantity += qty;
            }
        }
        return totalQuantity;
    }

    static totalCartPrice(cart) {
        let totalPrice = 0;
    
        for (const item of cart) {
            const qty = parseInt(item.qty, 10);
            const price = parseFloat(item.price.value);
    
            if (!isNaN(qty) && !isNaN(price)) {
                totalPrice += qty * price;
            }
        }
        return totalPrice;
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
            toastComponent.toastNotification('toast-removed-from-cart', 'success', '#0FB681', 'center');
            this.updateCart();
            return;
        }

        this.cart.splice(productToRemoveId, 1);
        if (document.getElementsByClassName('checkout__products')[0]) {
            await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.checkout__products')
        }
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products')
        localStorage.setItem('cart', JSON.stringify(this.cart));
        toastComponent.toastNotification('toast-removed-from-cart', 'success', '#0FB681', 'center');
        this.updateCart();
    }

    static async updateCart() {
        let badgeQtyCounter = document.getElementsByClassName('main-header__wrapper__cart-button-container__qty-cart')[0];
        let cartTotal = document.getElementsByClassName('cart-total')[0];

        badgeQtyCounter.innerHTML = 0;
        cartTotal.innerHTML = 0;

        cartTotal.innerHTML = this.totalCartPrice(this.cart)
        badgeQtyCounter.innerHTML = this.totaCartItems(this.cart);

        if (badgeQtyCounter.innerHTML > '0') {
            badgeQtyCounter.classList.add("visible");
        } else {
            badgeQtyCounter.classList.remove("visible");
        }
    }

    static async init() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await render.renderTemplateCards(this.cart, 'templates/card-cart-preview.hbs', '.cart-modal__products');
        this.updateCart();
    }
}

export default ModuleCart;
