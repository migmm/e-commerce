import ModuleCart from './modules/cart.js'
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        let closeMenu = document.getElementById('main-nav-toggle');

        links.forEach(link => {
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

        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                goTopButton.style.display = 'block';
            } else {
                goTopButton.style.display = 'none';
            }
        };

        goTopButton.addEventListener('click', e => {
            e.preventDefault();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });

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
    }

    async start() {
        await this.loadTemplates();
        this.commonEvents();
        ModuleCart.cartFunctions();
        // ModuleCart.init();
    }
}

const main = new Main();
main.start();
