import cartService from '../services/cart.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/modules/toast.js';

console.log('🆗: Módulo ModuleCart cargado.');

class ModuleCart {

    static cart = [];

    static async renderCardsCartPreview(products) {
        const hbsFile = await fetch('templates/card-cart-preview.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cart-modal__products').innerHTML = html;
    }

    static cartFunctions() {

        const backgroundDark = document.querySelector('.background-dark');
        const cartPreview = document.querySelector('.cart-modal');
        let isCartPreviewOpen = false;


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
        });
    }

    static async addItemToCart(id) {
        const products = await productController.getProducts();
        const product = products.find(product => product.id == id)
        const productToRemoveId = this.cart.findIndex(product => product.id == id)

        if (productToRemoveId >= 0) {
            ++this.cart[productToRemoveId].qty;
            await ModuleCart.renderCardsCartPreview(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            toastComponent.toastNotification("Producto agregado al carrito!");
            ModuleCart.updateCart();
            return;
        }

        this.cart.push(product);
        this.cart[this.cart.length - 1].qty = 1;
        await ModuleCart.renderCardsCartPreview(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        toastComponent.toastNotification("Producto agregado al carrito!");
        ModuleCart.updateCart();
    }

    static async removeItemFromCart(id) {
        const productToRemoveId = this.cart.findIndex(product => product.id == id);
        this.cart.splice(productToRemoveId, 1);
        await ModuleCart.renderCardsCartPreview(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        ModuleCart.updateCart();
    }

    static async updateCart() {
        let badgeQtyCounter = document.getElementsByClassName('main-header__wrapper__cart-button-container__qty-cart')[0];
        badgeQtyCounter.innerHTML = 0;

        console.log(typeof (badgeQtyCounter.innerHTML));
        for (let i = 0; i <= this.cart.length - 1; ++i) {
            badgeQtyCounter.innerHTML = parseInt(badgeQtyCounter.innerHTML) + parseInt(this.cart[i].qty);
        }

        if (badgeQtyCounter.innerHTML > '0') {
            badgeQtyCounter.classList.add("visible");

        } else {
            badgeQtyCounter.classList.remove("visible");
        }

        const cartLoaded = await cartService.loadCart();
        console.log('cart guardado en mongo', cartLoaded);
        let cartActual = this.cart;
        console.log('cart actual', cartActual);

        const loggedIn = true;
        const user = 'arthemis'; // johnse - alfredoro - carlos23
        let savedCart = {};

        if (loggedIn) {

            var index = cartLoaded.findIndex(item => item.userID === user);
            console.log(index);
            console.log(cartLoaded[index].id);
            const userID = cartLoaded[index].id;
            savedCart.userID = user;
            savedCart.cartContent = this.cart;
            await cartService.updateCart(savedCart, userID);
        }
    }

    static async init() {
        console.log('ModuleCart.init()');
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        await ModuleCart.renderCardsCartPreview(this.cart);
        ModuleCart.updateCart();
    }
}

export default ModuleCart;
