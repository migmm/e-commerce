import ModuleCart from './modules/cart.js';
import productController from './controllers/product.js';
import render from '/js/utils/render.js';
import hbsHelpers from './utils/hb-templates.js';
import find from './utils/find.js';
import fetchLanguageData from './utils/langFunctions.js'
import authController from './controllers/auth.js';
import ModuleFavs from './modules/favs.js';


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

            const productsFound = find.find(e.target.value, this.products)
            await render.renderTemplateCards(productsFound, 'templates/search-results.hbs', '.search-results-list');

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

        /* searchBar.addEventListener('focus',  e => {
        }); */
    }

    static decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    static async refreshAccessToken() {
        //const refreshToken = getCookieValue('refreshToken');

        try {
            const login = await authController.refreshToken();
            console.log("login", login.responseData.accessToken)

            const decodedToken = Main.decodeJWT(login.responseData.accessToken);
            console.log('Username:', decodedToken.username);
            console.log('Role:', decodedToken.role);

            if (login.status === 401) {
                window.location.href = '/#/login';
                return;
            }

            if (login.status === 200) {

                if (decodedToken.role === "user") {
                    var menu = document.querySelector('.login-button-menu');
                    menu.innerHTML = `
                    <a href="#/profile" class="panel-button-menu__panel-button"
                        data-lang="signin">USER</a>
                        <a href="#/logout" class="logout-button-menu__logout-button"
                        data-lang="logout">Salir
                    </a>
                    `;
                }

                if (decodedToken.role === "admin") {
                    var menu = document.querySelector('.login-button-menu');
                    menu.innerHTML = `
                        <a href="#/profile" class="panel-button-menu__panel-button"
                            data--lang="nav-bar-admin-button">ADMIN</a>
                            <a href="#/logout" class="logout-button-menu__logout-button"
                            data-lang="nav-bar-logout-button">Salir
                        </a>
                        `;
                }
            }

        } catch (error) {
            console.error('Error during refresh token:', error);
        }
    }

    getLogoutButton() {

        const logoutButton = document.getElementsByClassName('logout-button-menu__logout-button')[0];
        console.log(logoutButton)
        if (logoutButton) {
            console.log("sdd")
            logoutButton.addEventListener('click', e => {
                console.log("sdd")
                e.preventDefault();
                Main.logout();
            });
        }
    }

    static async logout() {
        console.log("ing")
        const logout = await authController.logout();
        console.log(logout)
        if (logout.status === 200) {
            window.location.href = '/#/login';
        }
    }
    async start() {

        // register ALL helpers at start
        Handlebars.registerHelper(hbsHelpers);
        fetchLanguageData.fetchLanguageData();
        await this.loadTemplates();
        this.commonEvents();
        ModuleCart.cartFunctions();
        //this.products = await productController.getProducts('es');
        // ModuleCart.init();
        await Main.refreshAccessToken();
        this.getLogoutButton()

        const favoritosString = localStorage.getItem('favs');
        const favoritos = favoritosString ? JSON.parse(favoritosString) : [];
        console.log("davbd", favoritos);

        Handlebars.registerHelper('isFavorito', function (productId) {
            console.log(favoritos.find(e => e.id === productId))
            return favoritos.find(e => e.id === productId)
            //return favoritos.includes(productId);
        });

        ModuleFavs.favsFunctions();
        ModuleFavs.init();
    }
}

const main = new Main();
main.start();
