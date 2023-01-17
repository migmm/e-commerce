
import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import render from '/js/utils/render.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class PageInicio {

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

    static cardSlider() {
        let isDown = false;
        let startX;
        let scrollLeft;
        const slider0 = document.querySelectorAll('.cards-container')[0];
        const slider1 = document.querySelectorAll('.cards-container')[1];
        const slider2 = document.querySelectorAll('.cards-container')[2];

        const end = () => {
            isDown = false;
            slider0.classList.remove('active');
            slider1.classList.remove('active');
            slider2.classList.remove('active');
            slider0.classList.remove('grab');
            slider1.classList.remove('grab');
            slider2.classList.remove('grab');
        }

        const start = (e) => {
            isDown = true;

            slider0.classList.add('active');
            startX = e.pageX || e.touches[0].pageX - slider0.offsetLeft;
            scrollLeft = slider0.scrollLeft;

            slider1.classList.add('active');
            startX = e.pageX || e.touches[0].pageX - slider1.offsetLeft;
            scrollLeft = slider1.scrollLeft;

            slider2.classList.add('active');
            startX = e.pageX || e.touches[0].pageX - slider2.offsetLeft;
            scrollLeft = slider2.scrollLeft;
        }

        const move = (e) => {
            if (!isDown) return;

            slider0.classList.add('grab');
            e.preventDefault();
            const x0 = e.pageX || e.touches[0].pageX - slider0.offsetLeft;
            const dist0 = (x0 - startX);
            slider0.scrollLeft = scrollLeft - dist0;

            slider1.classList.add('grab');
            const x1 = e.pageX || e.touches[1].pageX - slider1.offsetLeft;
            const dist1 = (x1 - startX);
            slider1.scrollLeft = scrollLeft - dist1;

            slider2.classList.add('grab');
            const x2 = e.pageX || e.touches[2].pageX - slider2.offsetLeft;
            const dist2 = (x2 - startX);
            slider2.scrollLeft = scrollLeft - dist2;
        }

        (() => {
            slider0.addEventListener('mousedown', start);
            slider0.addEventListener('touchstart', start);

            slider1.addEventListener('mousedown', start);
            slider1.addEventListener('touchstart', start);

            slider2.addEventListener('mousedown', start);
            slider2.addEventListener('touchstart', start);


            slider0.addEventListener('mousemove', move);
            slider0.addEventListener('touchmove', move);

            slider1.addEventListener('mousemove', move);
            slider1.addEventListener('touchmove', move);

            slider2.addEventListener('mousemove', move);
            slider2.addEventListener('touchmove', move);


            slider0.addEventListener('mouseleave', end);
            slider0.addEventListener('mouseup', end);
            slider0.addEventListener('touchend', end);

            slider1.addEventListener('mouseleave', end);
            slider1.addEventListener('mouseup', end);
            slider1.addEventListener('touchend', end);

            slider2.addEventListener('mouseleave', end);
            slider2.addEventListener('mouseup', end);
            slider2.addEventListener('touchend', end);
        })();
    }

    static arrowSlider() {

        document.addEventListener('click', e => { 

            if (e.target.classList.value === 'fa fa-chevron-circle-left fa-5x') {
                const slider = e.target.parentNode.previousElementSibling;
                slider.classList.add('scroll-smooth');
                slider.scrollLeft += -290;
                slider.classList.remove('scroll-smooth');
                return;
            }

            if (e.target.classList.value === 'fa fa-chevron-circle-right fa-5x') {
                const slider = e.target.parentNode.previousElementSibling.previousElementSibling;
                slider.classList.add('scroll-smooth');
                slider.scrollLeft += 290;
                slider.classList.remove('scroll-smooth');
                return; 
            }
        })
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        this.arrowSlider();
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        this.carousel();
        this.cardSlider();

        products.sort(function compare(a, b) {
            var dateA = new Date(a.addedDate);
            var dateB = new Date(b.addedDate);
            return dateB - dateA;
        })
        console.log(products);
        await render.renderTemplateCards(products, 'templates/card-row.hbs', '.cards-container')

        products.sort(function compare(a, b) {
            var dateA = new Date(a.lastSell);
            var dateB = new Date(b.lastSell);
            return dateB - dateA;
        })
        await render.renderTemplateCards(products, 'templates/card-row.hbs', '.most-selled')


        await render.renderTemplateCards(products, 'templates/card-row.hbs', '.latest-viewed')

        await cartController.init();
    }
}

export default PageInicio;