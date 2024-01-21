import ModuleCart from './modules/cart.js';
import render from '/js/utils/render.js';
import hbsHelpers from './utils/hb-templates.js';
import fetchLanguageData from './utils/langFunctions.js';
import currencySet from './utils/currencies.js';

import ModuleFavs from './modules/favs.js';
import productController from './controllers/product.js';

import authManager from './utils/authManager.js';
import navigationManager from './utils/navigationManager.js';


class Main {

    static links;

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
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
        const moduleUrl = navigationManager.getModuleUrlFromId(id);
        try {
            const { default: module } = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`Module ${id} does not have init() method.`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`Can't import module ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        this.links = document.querySelectorAll('.main-nav__link');
        const id = navigationManager.getIdFromHash();
        const viewUrl = navigationManager.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);
        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
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
        const form = document.getElementsByClassName('main-header__wrapper__form')[0]
        const userMenu = document.getElementsByClassName('main-header__wrapper__login-button-container')[0];

        userMenu.addEventListener('click', e => {
            const menuButton = document.querySelector('.login-button-menu');
            const computedStyle = window.getComputedStyle(menuButton);

            if (computedStyle.display === 'none' || computedStyle.display === '') {
                menuButton.style.display = 'block';
            } else {
                menuButton.style.display = 'none';
            }
        });

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

        searchBar.addEventListener('input', async e => {

            const currentLang = localStorage.getItem('langSelection') || 'en';

            let query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=urlName&value=${e.target.value}`;
            const products = await productController.getProducts(currentLang, query);

            console.log(products)
            await render.renderTemplateCards(products.products, 'templates/search-results.hbs', '.search-results-list');
            
            if (e.target.value.length == 0) {
                searchResults.classList.remove('visible');
                return;
            }

            searchQuery.innerHTML = e.target.value;
            searchLink.href = `/#/productos/${e.target.value}`;
            searchResults.classList.add('visible');
        });

        form.addEventListener('submit', e => {
            e.preventDefault();

            if (searchBar.value.length == 0) {
                return;
            }

            window.location.href = `#/productos/${searchBar.value}`;
            searchResults.classList.remove('visible');
        })
    }

    async start() {

        // register ALL helpers at start
        Handlebars.registerHelper(hbsHelpers);

        fetchLanguageData.fetchLanguageData();
        await this.loadTemplates();
        this.commonEvents();
        ModuleCart.cartFunctions();

        await authManager.refreshAccessToken();

        //Check this [Object: null prototype] {}
        authManager.getLogoutButton()

        ModuleFavs.favsFunctions();

        //Check this TypeError: Cannot read properties of undefined (reading 'es')
        ModuleFavs.init();
        currencySet.currencySet();
    }
}

const main = new Main();
main.start();
