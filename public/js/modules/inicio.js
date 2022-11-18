
import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';

console.log('🆗: Módulo PageInicio cargado.');

class PageInicio {

    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
        document.querySelector('.most-selled').innerHTML = html;
        document.querySelector('.latest-viewed').innerHTML = html;
    }

    static carousel() {
        var slideIndex = 0;
        carousel();

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }

            slideIndex++;
            if (slideIndex > x.length) { slideIndex = 1 }
            x[slideIndex - 1].style.display = "block";
            setTimeout(carousel, 2000);
            x = false // Change image every 2 seconds
        }
    }
    static async init() {
        console.log('PageInicio.init()');
        //goToTopAndCloseMenu ();

        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        PageInicio.carousel()
        await PageInicio.renderTemplateCards(products);
        await cartController.renderCardsCartPreview(products)

    }
}

export default PageInicio;