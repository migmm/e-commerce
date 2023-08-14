
import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import cardSliders from '../utils/cardSliders.js';
import heartButton from '../utils/heartButton.js';


class PageInicio {

    static carousel() {
        var slideIndex = 0;
        carousel();

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (x.length === 0) return; // si no hay elementos con la clase "mySlides" en la página actual, detener la función

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
        const currentLang = localStorage.getItem('langSelection') || 'en';
        goTopOnLoad.goToTopOnLoad();
        cardSliders.arrowSlider();

        const products = await productController.getProducts(currentLang);
        console.log(`Se encontraron ${products.length} productos`);
        console.log(products)
        this.carousel();
        cardSliders.cardSlider();

        products.products.sort(function compare(a, b) {
            var dateA = new Date(a.addedDate);
            var dateB = new Date(b.addedDate);
            return dateB - dateA;
        })
        
        console.log(products);

        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.cards-container');

        products.products.sort(function compare(a, b) {
            var dateA = new Date(a.lastSell);
            var dateB = new Date(b.lastSell);
            return dateB - dateA;
        })

        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.most-selled')
        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.latest-viewed')

        await cartController.init();

        heartButton();

        const fetchdata = await fetchLanguageData.fetchLanguageData();
        console.log(fetchdata);

    }
}

export default PageInicio;