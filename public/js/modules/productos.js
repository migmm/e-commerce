import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import find from '../utils/find.js';
import heartButton from '../utils/heartButton.js';
import getIdFromHash from '../utils/getIdFromHash.js';


class PageProductos {

    static products = [];

    static async optionsFunctions() {
        const currentLang = 'en';
        document.addEventListener('click', async e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();

                var toSearch = e.target.innerHTML;
                console.log(toSearch)
                const query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=all&value=${toSearch}`;
                this.products = await productController.getProducts(currentLang, query);
                render.renderTemplateCards(this.products.products, 'templates/card-all-products.hbs', '.section-cards__cards-container');
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML;
                const selectedOption = innerOfSelected.split("/");

                var toSearch = selectedOption.toString();
                console.log(toSearch)
                const query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=all&value=${toSearch}`;
                this.products = await productController.getProducts(currentLang, query);
                render.renderTemplateCards(this.products.products, 'templates/card-all-products.hbs', '.section-cards__cards-container');
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
        const search = await getIdFromHash();
        if (search) {
            query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=all&value=${search}`;
            this.products = await productController.getProducts(currentLang, query);
            render.renderTemplateCards(this.products.products, 'templates/card-all-products.hbs', '.section-cards__cards-container');
        }

        await cartController.init();
        
        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');
        heartButton();
    }
}

export default PageProductos;
