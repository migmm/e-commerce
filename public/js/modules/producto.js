import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';

console.log('🆗: Módulo PageProducto cargado.');

class PageProducto {

    static products = [];

    static getIdFromHash(route) {

        let results = [];

        // Remove #
        let hashFromURL = location.hash.slice(1);
        console.log(hashFromURL)

        // Check if / exist at beginning, if exist remove
        if (hashFromURL[0] === '/') {
            hashFromURL = hashFromURL.slice(1);
        }

        console.log(hashFromURL)
        hashFromURL = hashFromURL.split('/');

        if (route === 1) {

            hashFromURL = '#/' + hashFromURL[0]
            hashFromURL = hashFromURL.toLowerCase()
            window.location.hash = hashFromURL;
            return;
        }

        hashFromURL = hashFromURL[1];
        const nameCheck = hashFromURL.split('-');
        hashFromURL = nameCheck.slice(0,-1).join(' ')        
        let toSearch = hashFromURL

        for (var i = 0; i < this.products.length; ++i) {
            for (let productName in this.products[i]) {
                if (this.products[i][productName].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
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
                let id = e.target.getAttribute("data-id");
                cartController.addItemToCart(id);
                return;
            }

            // Click on plus icon to increase product quantity in cart to the maximum stock
            if (e.target.classList.value === 'fa fa-plus full-page-view') {

                let inputStock = document.getElementsByClassName('product-full-page__qty')[0];
                const maxStock = parseInt(document.querySelector('product-full-page__stock-value'));
                let inputStockValue = parseInt(inputStock.value)

                if (inputStockValue >= maxStock) {
                    e.target.classList.add('plus-and-minus-deactivated');
                    return;
                } else {
                    e.target.classList.remove('plus-and-minus-deactivated');
                }

                inputStockValue++;
                inputStock.value = inputStockValue;
                return;
            }

            // Click on minus icon to decrease product quantity in cart to the minimum stock
            if (e.target.classList.value === 'fa fa-minus full-page-view') {

                let inputStock = document.getElementsByClassName('product-full-page__qty')[0];
                const maxStock = parseInt(document.querySelector('product-full-page__stock-value'));
                let inputStockValue = parseInt(inputStock.value)

                if (inputStockValue <= maxStock) {
                    e.target.classList.remove('plus-and-minus-deactivated');
                    return;
                } else {
                    e.target.classList.add('plus-and-minus-deactivated');
                }

                inputStockValue--;
                inputStock.value = inputStockValue;
                return;
            }

        });
    }

    static goToTopOnLoad() {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.classList.remove('scroll-smooth');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        htmlTag.classList.add('scroll-smooth');
    }

    static async init() {
        console.log('PageProducto .init()');
        PageProducto.goToTopOnLoad();
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products.length} productos`);
        PageProducto.optionsFunctions();
        const productoo = PageProducto.getIdFromHash(2)
        await render.renderTemplateCards(productoo, 'templates/producto.hbs', '.full-product-page')
        await cartController.init();
    }
}

export default PageProducto;
