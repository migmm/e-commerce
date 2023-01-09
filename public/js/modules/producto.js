import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class PageProducto {

    static products = [];

    static getIdFromHash(route) {

        let results = [];

        // Remove #
        let hashFromURL = location.hash.slice(1);

        // Check if / exist at beginning, if exist remove
        if (hashFromURL[0] === '/') {
            hashFromURL = hashFromURL.slice(1);
        }

        hashFromURL = hashFromURL.split('/');

        if (route === 1) {

            hashFromURL = '#/' + hashFromURL[0]
            hashFromURL = hashFromURL.toLowerCase()
            window.location.hash = hashFromURL;
            return;
        }

        hashFromURL = hashFromURL[1];
        const nameCheck = hashFromURL.split('-');
        hashFromURL = nameCheck.slice(0, -1).join(' ')
        let toSearch = hashFromURL

        for (var i = 0; i < this.products.length; ++i) {
            for (let urlName in this.products[i]) {
                if (this.products[i][urlName].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                    results = this.products[i]
                }
            }
        }

        return results;
    }

    static async optionsFunctions() {

        document.addEventListener('click', e => {


            // Click on image thumbnail to see full image
            if (e.target.parentNode.classList.value === 'img-select__img-container') {
                let bigImg = document.getElementsByClassName('img-display__img-big')[0];
                bigImg.src = e.target.src;
                return;
            }

            // Click on "Agregar al carrito"
            if (e.target.classList.value === 'product-full-page__link') {
                e.preventDefault();
                const inputStock = document.getElementsByClassName('product-full-page__qty')[0];

                let id = e.target.getAttribute("data-id");
                cartController.addItemToCart(id, parseInt(inputStock.value));
                return;
            }

            // Click on plus icon to increase product quantity in cart to the maximum stock
            if (e.target.classList.value === 'product-full-page__qty-button-plus') {

                const inputStock = document.getElementsByClassName('product-full-page__qty')[0];
                const buttonPlus = document.getElementsByClassName('product-full-page__qty-button-plus')[0];
                const buttonMinus = document.getElementsByClassName('product-full-page__qty-button-minus')[0];
                const maxStock = document.getElementsByClassName('product-full-page__stock-value')[0];

                inputStock.value++

                if (parseInt(inputStock.value) >= parseInt(maxStock.innerHTML)) {
                    buttonPlus.setAttribute("disabled", "");
                } else {
                    buttonMinus.removeAttribute("disabled", "");
                }
                return;
            }

            // Click on minus icon to decrease product quantity in cart to the minimum stock
            if (e.target.classList.value === 'product-full-page__qty-button-minus') {

                const inputStock = document.getElementsByClassName('product-full-page__qty')[0];
                const buttonPlus = document.getElementsByClassName('product-full-page__qty-button-plus')[0];
                const buttonMinus = document.getElementsByClassName('product-full-page__qty-button-minus')[0];

                inputStock.value--
                if (inputStock.value <= '1') {
                    buttonMinus.setAttribute("disabled", "");
                } else {
                    buttonPlus.removeAttribute("disabled", "");
                }

                return;
            }

        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products.length} productos`);
        this.optionsFunctions();
        const productoo = this.getIdFromHash(2)
        await render.renderTemplateCards(productoo, 'templates/producto.hbs', '.full-product-page')
        await cartController.init();
    }
}

export default PageProducto;
