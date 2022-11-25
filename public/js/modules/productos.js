import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';

console.log('🆗: Módulo PageProductos cargado.');

class PageProductos {

    static products = [];

    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }

    static async optionsFunctions() {

        document.addEventListener('click', e => {
            e.preventDefault();

            if (e.target.tagName === 'SPAN') {
                console.log(e.target.innerHTML)

                var results = [];
                var toSearch = e.target.innerHTML;

                for (var i = 0; i < this.products.length; ++i) {
                    for (let key in this.products[i]) {
                        if (this.products[i][key].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                            results.push(this.products[i]);
                        }
                    }
                }

                console.log(results)
                PageProductos.renderTemplateCards(results);
                return;
            }

            if (e.target.closest('aside') && e.target.tagName === 'A') {
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

                console.log(results)
                PageProductos.renderTemplateCards(results);
                return;
            }

            /*             
            if (e.target.classList.value === 'background-dark') {
            
                            return;
                        } */
        });
    }

    static async init() {
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products} productos`);
        PageProductos.optionsFunctions()
        await PageProductos.renderTemplateCards(this.products);
        await cartController.init()
        console.log('PageProductos .init()');
        //goToTopAndCloseMenu ();
    }
}

export default PageProductos;
