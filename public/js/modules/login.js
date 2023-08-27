import cartController from '../modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import authController from '../controllers/auth.js';
//import Validations from '../utils/validation.js';

class PageLogin {

    static form;
    static fields;
    static errorMsg;

    static async postLogin(product) {
        const mode = 'json';
        const savedProduct = await authController.postLogin(product, mode);
        return savedProduct;
    }

    static async addFormEvents() {

        PageLogin.form.addEventListener('submit', async e => {
            e.preventDefault();

            if (this.validateForm()) {

                const data = {};
                PageLogin.fields.forEach(field => {
                    data[field.name] = field.value;
                });

                const mode = 'json';
                const login = await authController.postLogin(data, mode);

                if (login.status === 201) {
                    localStorage.setItem('logged', 'true');
                    window.location.href = '/#/inicio';
                    location.reload();
                    return;
                }

                this.errorMsg[2].style.visibility = "visible";
                PageLogin.form.reset();
                return;
            }
        });
    }

    static async checkLogin() {
        const storedLogin = localStorage.getItem('logged');
        const login = await authController.refreshToken();

        if (storedLogin === 'true' &&
            login.status === 200)
            window.location.href = '/#/inicio';
    }

    static validateForm() {
        var result = true;

        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].value.trim() === '') {
                this.errorMsg[i].style.visibility = 'visible';
                result = false;
            } else {
                this.errorMsg[i].style.visibility = 'hidden';
            }
        }
        return result
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
        const cookieValue = document.cookie;
        console.log(cookieValue);

        this.form = document.getElementById('form-login');
        this.fields = this.form.querySelectorAll('input');
        this.errorMsg = this.form.querySelectorAll('span');
        this.addFormEvents();
        this.checkLogin();
        document.getElementById('email').focus();
        await cartController.init();

    }
}

export default PageLogin;
