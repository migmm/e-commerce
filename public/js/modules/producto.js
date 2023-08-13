import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import Find from '../utils/find.js';
import fetchLanguageData from '../utils/langFunctions.js'

class PageProducto {

    static products = [];

    static async getIdFromHash(route) {

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
        
        let searchResult = Find.find(hashFromURL, this.products)
        
        await render.renderTemplateCards(searchResult, 'templates/producto.hbs', '.full-product-page')
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
        const currentLang = localStorage.getItem('langSelection') || 'en';
        goTopOnLoad.goToTopOnLoad();
        this.products = await productController.getProducts(currentLang);
        console.log(this.products)
        console.log(`Se encontraron ${this.products.length} productos`);
        this.optionsFunctions();
        const product = this.getIdFromHash(2)
       // await render.renderTemplateCards(product, 'templates/producto.hbs', '.full-product-page')
        await cartController.init();
        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');

        const fetchdata = await fetchLanguageData.fetchLanguageData();
        console.log(fetchdata);
    }
}

export default PageProducto;
