import ModuleCart from './modules/cart.js';
import productController from './controllers/product.js';
import render from '/js/utils/render.js';
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

    // query is what you search
    // fields is where do you want to search in the object, eg: productName

    async searchProducts(query, fields) {

        // if products is not filled show nothing

        if (!this.products) {
            console.log("notiene")
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

        //console.log('resultados sin filtrar', results)

        // Remove duplicated
        let result = results.filter(
            (person, index) => index === results.findIndex(
                other => person.id === other.id
                    && person.productName === other.productName
            )
        );
        
        console.log('resultados filtrados', result)
        return result;        
    } 

    commonEvents() {
        const goTopButton = document.getElementById('myBtn');
        const navBar = document.getElementsByClassName('main-header__wrapper')[0];
        const logo = document.getElementsByClassName('main-header__wrapper__logo-container__logo')[0];
        const searchBarContainer = document.getElementsByClassName('main-header__wrapper__search-form-container')[0];
        const searchBar = document.getElementsByClassName('navbar-search-input')[0];
        const searchResults = document.getElementsByClassName('main-header__wrapper__search-results-list')[0]
        

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

            const rsrr = await this.searchProducts(e.target.value, ['productName', 'vendor'])
            console.log("eeeeeeeeeeeeeee",rsrr)
            await render.renderTemplateCards(rsrr, 'templates/search-results.hbs', '.main-header__wrapper__search-results-list');

            if (e.target.value.length == 0) {
                searchResults.classList.remove('visible');
                return;
            }
            searchResults.classList.add('visible');
        });

        /* searchBar.addEventListener('focus',  e => {
        }); */

        Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

            let operators, result;

            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }

            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }

            operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }

            result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }

        });

        Handlebars.registerHelper('discount', function (price, discount) {
            return price - ((price * discount) / 100);
        });

        Handlebars.registerHelper('finalPrice', function (price, discount, qty) {
            return (price - ((price * discount) / 100)) * qty;
        });
    }

    async start() {
        await this.loadTemplates();
        this.commonEvents();
        ModuleCart.cartFunctions();
        this.products = await productController.getProducts();
        // ModuleCart.init();
    }
}

const main = new Main();
main.start();
