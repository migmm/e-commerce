
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
            const x1 = e.pageX || e.touches[0].pageX - slider1.offsetLeft;
            const dist1 = (x1 - startX);
            slider1.scrollLeft = scrollLeft - dist1;

            slider2.classList.add('grab');
            const x2 = e.pageX || e.touches[0].pageX - slider2.offsetLeft;
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

    static async init() {
        console.log('PageInicio.init()');
        //goToTopAndCloseMenu ();

        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        PageInicio.carousel()
        PageInicio.cardSlider()
        await PageInicio.renderTemplateCards(products);
        await cartController.init()

    }
}

export default PageInicio;