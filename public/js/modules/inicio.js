
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
            if (x.length === 0) return;

            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }

            slideIndex++;
            if (slideIndex > x.length) { slideIndex = 1 }
            x[slideIndex - 1].style.display = "block";
            setTimeout(carousel, 2000);
            x = false
        }
    }

    static async init() {
        const currentLang = localStorage.getItem('langSelection') || 'en';
        goTopOnLoad.goToTopOnLoad();
        cardSliders.arrowSlider();

        this.carousel();
        cardSliders.cardSlider();

        let query = 'page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=addedDate&value='
        let products = await productController.getProducts(currentLang,query);
        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.cards-container');
        
        query = 'page=1&perPage=10&sortBy=lastSell&sortOrder=desc&field=lastSell&value='
        products = await productController.getProducts(currentLang,query);
        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.most-selled')

        query = 'page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=lastSell&value='
        products = await productController.getProducts(currentLang,query);
        await render.renderTemplateCards(products.products, 'templates/card-row.hbs', '.latest-viewed')

        await cartController.init();
        heartButton();

        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageInicio;