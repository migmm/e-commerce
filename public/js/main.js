import ModuleCart from './modules/cart.js';
import productController from './controllers/product.js';
import render from '/js/utils/render.js';
import hbsHelpers from './utils/hb-templates.js';
class Main {

    static links

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {

        // Remove #
        let hashFromURL = location.hash.slice(1);
        let id = 404;

        // Check if / exist at beginning, if exist remove
        if (!hashFromURL[0] === '/') {
            return 404
        }

        hashFromURL = hashFromURL.slice(1);

        // Check if / exist at the end of first value, if exist remove 
        if (hashFromURL[hashFromURL.length - 1] === '/') {
            hashFromURL = hashFromURL.slice(0, 6);
        }

        hashFromURL = hashFromURL.split('/');

        if (hashFromURL.length > 2) {
            return 404
        }

        hashFromURL = hashFromURL[0] || 'inicio';

        for (let i = 0; i < this.links.length; ++i) {
            if (this.links[i].getAttribute('href') === `#/${hashFromURL}`) {
                id = hashFromURL;
                break;
            }
        }
        return id;
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {

        let closeMenu = document.getElementById('main-nav-toggle');

        this.links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
            closeMenu.checked = false;
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const { default: module } = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        this.links = document.querySelectorAll('.main-nav__link');
        const id = this.getIdFromHash();
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);
        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    // query is a string and is what you search
    // fields is an array and is where do you want to search in the object, eg: productName

    async searchProducts(query, fields) {

        // if products is not filled show nothing
        if (!this.products) {
            return;
        }

        let results = []
        for (var i = 0; i < this.products.length; ++i) {
            for (let key of fields) {
                if (this.products[i][key].toString().toLowerCase().indexOf(query.toLowerCase()) != -1) {
                    results.push(this.products[i]);
                }
            }
        }

        // Remove duplicated
        let result = results.filter(
            (person, index) => index === results.findIndex(
                other => person.id === other.id
                    && person.productName === other.productName
            )
        );

        return result;        
    } 

    commonEvents() {
        const goTopButton = document.getElementById('myBtn');
        const navBar = document.getElementsByClassName('main-header__wrapper')[0];
        const logo = document.getElementsByClassName('main-header__wrapper__logo-container__logo')[0];
        const searchBarContainer = document.getElementsByClassName('main-header__wrapper__search-form-container')[0];
        const searchBar = document.getElementsByClassName('navbar-search-input')[0];
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results')[0]
        const searchLink = document.getElementsByClassName('search-results__link')[0]
        const searchQuery = document.getElementsByClassName('search-results__result')[0]

        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                goTopButton.style.display = 'block';
                navBar.classList.add('navbar-resize');
                logo.classList.add('logo-resize');
                searchBarContainer.classList.add('nav-bar-container-resize');
            } else {
                goTopButton.style.display = 'none';
                navBar.classList.remove('navbar-resize');
                logo.classList.remove('logo-resize');
                searchBarContainer.classList.remove('nav-bar-container-resize');
            }
        };

        goTopButton.addEventListener('click', e => {
            e.preventDefault();
            const htmlTag = document.getElementsByTagName('html')[0];
            htmlTag.classList.add('scroll-smooth');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            htmlTag.classList.remove('scroll-smooth');
        });

        searchBar.addEventListener('input',  async e => {

            const productsFound = await this.searchProducts(e.target.value, ['productName', 'vendor'])

            await render.renderTemplateCards(productsFound, 'templates/search-results.hbs', '.search-results-list');

            if (e.target.value.length == 0) {
                searchResults.classList.remove('visible');
                return;
            }
            
            searchQuery.innerHTML = e.target.value;
            searchLink.href = `/#/productos/${e.target.value}`;
            searchResults.classList.add('visible');
        });

        /* searchBar.addEventListener('focus',  e => {
        }); */
    }

    async start() {

        // register ALL helpers at start
        Handlebars.registerHelper(hbsHelpers);

        await this.loadTemplates();
        this.commonEvents();
        ModuleCart.cartFunctions();
        this.products = await productController.getProducts();
        // ModuleCart.init();
    }
}

const main = new Main();
main.start();
