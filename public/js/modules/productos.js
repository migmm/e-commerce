import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import find from '../utils/find.js';


class PageProductos {

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

            hashFromURL = '#/' + hashFromURL[0];
            hashFromURL = hashFromURL.toLowerCase();
            window.location.hash = hashFromURL;
            return;
        }

        hashFromURL = hashFromURL[1];
        let toSearch = hashFromURL;

        // Check if the hash is only "products"
        if (toSearch === undefined) {
            toSearch = this.products;
            render.renderTemplateCards(toSearch, 'templates/card-all-products.hbs', '.section-cards__cards-container');
            return;
        }

        const searchResult = find.find(toSearch, this.products)
        render.renderTemplateCards(searchResult, 'templates/card-all-products.hbs', '.section-cards__cards-container');
        return results;
    }

    static async optionsFunctions() {

        document.addEventListener('click', e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();
                var results = [];
                var toSearch = e.target.innerHTML;

                const searchResult = find.find(toSearch, this.products)
                render.renderTemplateCards(searchResult, 'templates/card-all-products.hbs', '.section-cards__cards-container');
                return;
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML
                const selectedOption = innerOfSelected.split("/");
                var results = [];
                var toSearch = selectedOption.toString();

                const searchResult = find.find(toSearch, this.products)
                render.renderTemplateCards(searchResult, 'templates/card-all-products.hbs', '.section-cards__cards-container');
                return;
            }

            /*             
            if (e.target.classList.value === 'background-dark') {
            
                            return;
                        } */
        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products.length} productos`);
        this.optionsFunctions();
        this.getIdFromHash();
        await cartController.init();
        
        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');

        const heartBtn = document.querySelectorAll('.heart-btn');

        heartBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const isFav = (this.dataset.fav === 'true');
                this.dataset.fav = !isFav;
                this.classList.toggle('clicked', !isFav);
            });
        });
    }
}

export default PageProductos;
