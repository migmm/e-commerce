import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import find from '../utils/find.js';
import heartButton from '../utils/heartButton.js';


class PageProductos {

    static products = [];

    static async getIdFromHash(route) {

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
            return toSearch;
        }

        const searchResult = find.find(toSearch, this.products)
        return searchResult;
    }

    static async optionsFunctions() {

        document.addEventListener('click', e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();

                var toSearch = e.target.innerHTML;

                const searchResult = find.find(toSearch, this.products)
                return searchResult;
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML
                const selectedOption = innerOfSelected.split("/");

                var toSearch = selectedOption.toString();

                const searchResult = find.find(toSearch, this.products)
                return searchResult;
            }
        });
    }

    static async init() {
        const currentLang = 'en';
        goTopOnLoad.goToTopOnLoad();

        let query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=&value=`;
        this.products = await productController.getProducts(currentLang, query);
        render.renderTemplateCards(this.products.products, 'templates/card-all-products.hbs', '.section-cards__cards-container');
        
        this.optionsFunctions();
        const search = this.getIdFromHash();
        await cartController.init();
        
        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');
        heartButton();
    }
}

export default PageProductos;
