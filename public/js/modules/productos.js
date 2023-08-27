import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import find from '../utils/find.js';
import heartButton from '../utils/heartButton.js';
import getIdFromHash from '../utils/getIdFromHash.js';
import { fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';


class PageProductos {

    static products = [];

    static async optionsFunctions() {
        document.addEventListener('click', async e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();

                var toSearch = e.target.innerHTML;

                const query = await queryFunction('all', toSearch)
                await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML;
                const selectedOption = innerOfSelected.split("/");

                var toSearch = selectedOption.toString();

                const query = await queryFunction('all', toSearch)
                await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
            }
        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();

        const query = await queryFunction()
        await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
        
        this.optionsFunctions();

        const search = await getIdFromHash();
        if (search) {
            const query = await queryFunction('all', search)
            await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
        }

        await cartController.init();
        
        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');
        heartButton();
    }
}

export default PageProductos;
