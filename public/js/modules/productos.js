import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';

console.log('🆗: Módulo PageProductos cargado.');

class PageProductos  {

    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }

    static async init () {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        await PageProductos.renderTemplateCards(products);
        await cartController.init()
        console.log('PageProductos .init()');
        //goToTopAndCloseMenu ();
    }
}

export default PageProductos;
