import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import cardSliders from '../utils/cardSliders.js';
import heartButton from '../utils/heartButton.js';
import { indexQueries, fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';

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
        
        goTopOnLoad.goToTopOnLoad();
        cardSliders.arrowSlider();

        this.carousel();
        cardSliders.cardSlider();

        for (const q of indexQueries) {
            const query = await queryFunction(q.key, q.value, q.key,)
            await fetchAndRenderProducts(query, q.label, q.template);
        }

        await cartController.init();
        heartButton();

        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageInicio;