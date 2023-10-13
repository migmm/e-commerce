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

    static generatePageLinks(data) {
        console.log(data)
        const totalPages = parseInt(data.totalPages);
        const pageContainer = document.querySelector('.pages-qty');
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.textContent = i;
            pageLink.href = `page=${i}&perPage=2&sortBy=addedDate&sortOrder=desc&field=all&value=`;
            pageContainer.appendChild(pageLink);

            if (i < totalPages) {
                const separator = document.createTextNode(' ');
                pageContainer.appendChild(separator);
            }
        }
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();

        const query = await queryFunction()
        const products = await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
        console.log(products)
        this.generatePageLinks(products);
        
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
