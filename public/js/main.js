import productController from '/js/controllers/product.js';

async function renderTemplateCards(products) {
    const textoToRender = await fetch('/templates/inicio.hbs').then(r => r.text());
    const template = Handlebars.compile(textoToRender);
    const html = template({ products });
    document.querySelector('.cards-container').innerHTML = html;
}

async function initInicio() {
    console.log('initInicio()');

    const products = await productController.getProducts();
    renderTemplateCards(products);

    console.log(`Se encontraron ${products.length} productos.`);
}

function initAlta() {
    console.log('initAlta()');
}

function initContacto() {
    console.log('initContacto()');
}

function initNosotros() {
    console.log('initNosotros()');
}

class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method}).then(r => r.text());
    }

    getIdFromHash() {
        console.log(location.hash.slice(1))
        return location.hash.slice(1) || 'inicio';
    }

    getUrlFromId(id) {
        return `views/${id}`;
    }

    setActiveLink (id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            // if (id === link.href.split('#')[1]) {
            if (id === link.id) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    initJS(id) {
        if (id === 'alta') {
            initAlta();
        } else if (id === 'inicio') {
            initInicio();
        } else if (id === 'contacto') {
            initContacto();
        } else if (id === 'nosotros') {
            initNosotros();
        }
    }

    async loadTemplate(id) {
        const url = this.getUrlFromId(id);
        const view = await this.ajax(url);
        const main = document.querySelector('main');
        main.innerHTML = view;
        
        this.initJS(id);
    }
    

    async loadTemplates() {
        const id = this.getIdFromHash();
        this.setActiveLink(id);
        // await this.loadTemplate(id);
        this.loadTemplate(id);

        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const id = link.pathname.slice(1);
                location.hash = id;
            });
        });

        window.addEventListener('hashchange', async e => {
            const id = this.getIdFromHash();
            this.setActiveLink(id);
            // await this.loadTemplate(id);
            this.loadTemplate(id);
        });

    }

    start() {
        this.loadTemplates();
    }

}

const main = new Main();
main.start();
