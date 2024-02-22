import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js';
import cardSliders from '../utils/cardSliders.js';
import heartButton from '../utils/heartButton.js';
import { fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';
import navigationManager from '../utils/navigationManager.js';

class PageProducto {

    static async optionsFunctions() {

        document.addEventListener('click', e => {
            const bigImg = document.getElementsByClassName('img-display__img-big')[0];
            const inputStock = document.getElementsByClassName('product-full-page__qty')[0];
            const buttonPlus = document.getElementsByClassName('product-full-page__qty-button-plus')[0];
            const buttonMinus = document.getElementsByClassName('product-full-page__qty-button-minus')[0];
            const maxStock = document.getElementsByClassName('product-full-page__stock-value')[0];

            // Click on image thumbnail to see full image
            if (e.target.parentNode.classList.value === 'img-select__img-container') {
                bigImg.src = e.target.src;
                return;
            }

            // Click on "Agregar al carrito"
            if (e.target.classList.value === 'product-full-page__link') {
                e.preventDefault();

                let id = e.target.getAttribute("data-id");
                cartController.addItemToCart(id, parseInt(inputStock.value));
                return;
            }

            // Click on plus icon to increase product quantity in cart to the maximum stock
            if (e.target.classList.value === 'product-full-page__qty-button-plus') {
                inputStock.value++;

                if (parseInt(inputStock.value) >= parseInt(maxStock.innerHTML)) {
                    buttonPlus.setAttribute("disabled", "");
                } else {
                    buttonMinus.removeAttribute("disabled", "");
                }
                return;
            }

            // Click on minus icon to decrease product quantity in cart to the minimum stock
            if (e.target.classList.value === 'product-full-page__qty-button-minus') {
                inputStock.value--;

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

        // Close search results
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0];
        searchResults.classList.remove('visible');

        this.optionsFunctions();
        await cartController.init();
        const productURL = navigationManager.getIdFromHash(2);

        const queryProduct = await queryFunction('urlName', productURL)
        const product = await fetchAndRenderProducts(queryProduct, '.full-product-page', 'templates/producto.hbs');

        const queryRelatedProducts = await queryFunction('category', product.products[0].category)
        const relatedProducts = await fetchAndRenderProducts(queryRelatedProducts, '.more-of-this-product', 'templates/card-row.hbs');
        
        //this.generatePageLinks(products);

        await fetchLanguageData.fetchLanguageData();
        cardSliders.cardSlider();
        cardSliders.arrowSlider();
        heartButton();
    }
}

export default PageProducto;
