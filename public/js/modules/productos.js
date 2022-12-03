import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';

console.log('🆗: Módulo PageProductos cargado.');

class PageProductos {

    static products = [];

    static async optionsFunctions() {

        document.addEventListener('click', e => {

            if (e.target.tagName === 'SPAN') {
                e.preventDefault();
                var results = [];
                var toSearch = e.target.innerHTML;

                for (var i = 0; i < this.products.length; ++i) {
                    for (let key in this.products[i]) {
                        if (this.products[i][key].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                            results.push(this.products[i]);
                        }
                    }
                }

                // Remove duplicated
                let result = results.filter(
                    (person, index) => index === results.findIndex(
                        other => person.id === other.id
                            && person.productName === other.productName
                    ));

                PageProductos.renderTemplateCards(result);
                return;
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
                e.preventDefault();
                const innerOfSelected = e.target.innerHTML
                const selectedOption = innerOfSelected.split("/");
                var results = [];
                var toSearch = selectedOption.toString();

                for (var i = 0; i < this.products.length; ++i) {
                    for (let key in this.products[i]) {
                        if (this.products[i][key].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                            results.push(this.products[i]);
                        }
                    }
                }
                
                render.renderTemplateCards(results, 'templates/inicio.hbs', '.section-cards__cards-container')
                return;
            }

            /*             
            if (e.target.classList.value === 'background-dark') {
            
                            return;
                        } */
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
        console.log('PageProductos .init()');
        PageProductos.goToTopOnLoad();
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products} productos`);
        PageProductos.optionsFunctions();
        await render.renderTemplateCards(this.products, 'templates/inicio.hbs', '.section-cards__cards-container')
        await cartController.init();
    }
}

export default PageProductos;
