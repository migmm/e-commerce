import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import authController from '../controllers/auth.js';
import userController from '../controllers/users.js';
import fetchLanguageData from '../utils/langFunctions.js'
import render from '/js/utils/render.js';

class PageSignup {

    static form;
    static fields;
    static errorMsg;

    static async signup(user) {
        const mode = 'json';
        const signedup = await userController.saveUser(user, mode);
        return signedup;
    }

    static async addFormEvents() {

        this.form.addEventListener('submit', async e => {
            e.preventDefault();

            if (this.validateForm()) {

                const data = {};
                PageSignup.fields.forEach(field => {
                    if (field.name !== 'reemail' && field.name !== 'repassword') {
                        data[field.name] = field.value;
                    }
                });

                const signup = await this.signup(data)

                if (signup.status === 201) {
                    await render.renderTemplateCards('', 'templates/signup-message.hbs', '.signup-container');
                    await fetchLanguageData.fetchLanguageData();
                    return;
                }

                this.errorMsg[2].style.visibility = "visible";
                PageSignup.form.reset();
                return;
            }
        });
    }

    static validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
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

        if (!this.validateEmail(this.fields[0].value)) {
            this.errorMsg[0].style.visibility = 'visible';
            this.errorMsg[0].innerHTML = "Ingresar un email válido";
            result = false;
        }

        if (this.fields[2].value.length < 4) {
            this.errorMsg[2].style.visibility = 'visible';
            this.errorMsg[2].innerHTML = 'El usuario debe tener 4 o mas caracteres';
            result = false;
        }

        if (this.fields[3].value.length < 8) {
            this.errorMsg[3].style.visibility = 'visible';
            this.errorMsg[3].innerHTML = 'La contraseña debe tener 8 o mas caracteres';
            result = false;
        }

        if (this.fields[0].value !== this.fields[1].value) {
            this.errorMsg[0].style.visibility = 'visible';
            this.errorMsg[0].innerHTML = "Los emails tienen que ser iguales";
            this.errorMsg[1].style.visibility = 'visible';
            this.errorMsg[1].innerHTML = "Los emails tienen que ser iguales";
            result = false;
        }

        if (this.fields[3].value !== this.fields[4].value) {
            this.errorMsg[3].style.visibility = 'visible';
            this.errorMsg[3].innerHTML = "Las contraseñas deben ser iguales";
            this.errorMsg[4].style.visibility = 'visible';
            this.errorMsg[4].innerHTML = "Las contraseñas deben ser iguales";
            result = false;
        }

        return result
    }

    static async checkLogin() {
        const storedLogin = localStorage.getItem('logged');
        const login = await authController.refreshToken();

        if (storedLogin === 'true' &&
            login.status === 200)
            window.location.href = '/#/inicio';
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
        this.form = document.getElementById('form-login');
        this.fields = this.form.querySelectorAll('input');
        this.errorMsg = this.form.querySelectorAll('span');
        this.addFormEvents();
        this.checkLogin();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageSignup;