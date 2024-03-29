import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import heartButton from '../utils/heartButton.js';
import navigationManager from '../utils/navigationManager.js';
import fetchLanguageData from '../utils/langFunctions.js';
import { fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';


class PageProductos {

    static products = [];
    static productsPerPage;
    static search;

    static async optionsFunctions() {
        const quantityPerPage = document.getElementById('quantity-per-page');

        quantityPerPage.addEventListener('change', async () => {
            this.productsPerPage = quantityPerPage.value;
            localStorage.setItem('productsPerPage', this.productsPerPage);
            const query = await queryFunction('', '', 'addedDate', 1, this.productsPerPage)
            const products = await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
            this.generatePageLinks(products, this.search);
        });

            document.querySelector('.pages-qty').addEventListener('click', async (e) => {
                e.preventDefault(); 

                if (e.target.tagName === 'A') {
                    const pageUrl = e.target.href; 
                    const params = new URLSearchParams(pageUrl.split('?')[1]);
                    const page = params.get('page');
                    const perPage = params.get('perPage');
                    const sortBy = params.get('sortBy');
                    const sortOrder = params.get('sortOrder');
                    const field = params.get('field');
                    const value = params.get('value');

                    const query = await queryFunction(field, value, sortBy, page, perPage, sortOrder);
                    await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
                }
            });

        document.addEventListener('click', async e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();

                var toSearch = e.target.innerHTML;

                const query = await queryFunction('all', toSearch)
                await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
                await fetchLanguageData.fetchLanguageData();
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML;
                const selectedOption = innerOfSelected.split("/");

                var toSearch = selectedOption.toString();

                const query = await queryFunction('all', toSearch)
                await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
                await fetchLanguageData.fetchLanguageData();
            }
        });
    }

    static generatePageLinks(data,value='') {
        const totalPages = parseInt(data.totalPages);
        const pageContainer = document.querySelector('.pages-qty');
        pageContainer.innerHTML = '';
        const perPage = localStorage.getItem('productsPerPage');

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.textContent = i;
            if(value) {
                pageLink.href = `api/products/en?page=${i}&perPage=${perPage}&sortBy=addedDate&sortOrder=desc&field=all&value=${value}`;
            } else {
                pageLink.href = `api/products/en?page=${i}&perPage=${perPage}&sortBy=addedDate&sortOrder=desc&field=&value=${value}`;
            }
            
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
        this.generatePageLinks(products);
        this.optionsFunctions();

        this.search = await navigationManager.getIdFromHash(2);

        if (this.search) {
            const query = await queryFunction('all', this.search)
            const products = await fetchAndRenderProducts(query, '.section-cards__cards-container', 'templates/card-all-products.hbs');
            this.generatePageLinks(products, this.search);
        }

        await cartController.init();
        await fetchLanguageData.fetchLanguageData();

        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        searchResults.classList.remove('visible');
        heartButton();
    }
}

export default PageProductos;
