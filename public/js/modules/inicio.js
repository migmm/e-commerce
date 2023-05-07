
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

    static cardSlider() {
        let isDown = false;
        let sliders = {};
        let startX;
        let scrollLeft;

        const end = () => {
            isDown = false;
            for (const slider of Object.values(sliders)) {
                slider.container.classList.remove('active', 'grab');
            }
        }

        const start = (e) => {
            isDown = true;
            const slider = e.target.closest('.cards-container');
            slider.classList.add('active');
            startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.classList.add('grab');
        }

        const move = (e) => {
            if (!isDown) return;
            const slider = e.target.closest('.cards-container');
            slider.classList.add('grab');
            e.preventDefault();
            const x = e.pageX || e.touches[0].pageX;
            const dist = (x - startX);
            slider.scrollLeft = scrollLeft - dist;
        }


        (() => {
            for (let i = 0; i < 3; i++) {
                const container = document.querySelectorAll('.cards-container')[i];
                container.addEventListener('mousedown', start);
                container.addEventListener('touchstart', start);
                container.addEventListener('mousemove', move);
                container.addEventListener('touchmove', move);
                container.addEventListener('mouseleave', end);
                container.addEventListener('mouseup', end);
                container.addEventListener('touchend', end);
            }
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


        const heartBtn = document.querySelectorAll('.heart-btn');

        heartBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const isFav = (this.dataset.fav === 'true');
                this.dataset.fav = !isFav;
                this.classList.toggle('clicked', !isFav);
            });
        });

    }
}

export default PageInicio;