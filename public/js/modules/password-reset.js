import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import getIdFromHash from '../utils/getIdFromHash.js';
import fetchLanguageData from '../utils/langFunctions.js';
import recoveryController from '../controllers/recovery.js';


class PageForgotPass {

    static token;
    static form;
    static fields;
    static errorMsg;

    static validators = {
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    static emptyForm() {
        PageForgotPass.fields.forEach(field => field.value = '');
    }

    static validate(value, validator) {
        return validator.test(value);
    }

    static validateForm() {
        let allValidated = true;
        const formToSend = {};
        console.log('\n\n');
        const msgGlobalError = document.getElementsByClassName('input-group__error-form')[0];

        for (const field of this.fields) {
            let validated;

            if (field.name === 'repassword') {
                const passwordField = this.fields.find(f => f.name === 'password');
                validated = field.value === passwordField.value;
            } else {
                validated = this.validate(field.value, this.validators[field.name]);
            }

            console.log(field.name, validated);

            let errorField = document.getElementsByName(field.name)[0];
            let ancest = errorField.closest(".input-group__form-group");
            let spanElement = ancest.querySelector('span:last-child');

            if (!validated) {
                errorField.classList.remove("input-group__input--ok");
                errorField.classList.add("input-group__input--error");
                spanElement.style.visibility = 'visible';

                allValidated = false;
                break;

            } else {
                formToSend[field.name] = field.value;

                errorField.classList.remove("input-group__input--error");
                errorField.classList.add("input-group__input--ok");
                spanElement.style.visibility = 'hidden';
            }
        }

        console.log('allValidated:', allValidated);
        if (!allValidated) {
            msgGlobalError.classList.add("input-group__error--show");
            return false;
        }
        return formToSend;
    }

    static async addFormEvents() {

        PageForgotPass.form.addEventListener('submit', async e => {
            e.preventDefault();

            if (this.validateForm()) {

                const data = {
                    password: PageForgotPass.fields.find(field => field.name === 'password').value
                };

                const mode = 'json';
                const login = await recoveryController.sendNewPassword(data, this.token, mode);
                console.log(login)
                if (login.status === 200) {
                    localStorage.setItem('logged', 'true');
                    window.location.href = '/#/inicio';
                    location.reload();
                    return;
                }

                this.errorMsg[2].style.visibility = "visible";
                PageForgotPass.form.reset();
                return;
            }
        });
    }

    static async init () {
        this.token = await getIdFromHash(2);
        console.log(this.token)
        goTopOnLoad.goToTopOnLoad();
        document.getElementById('password').focus();
        this.form = document.getElementById('form-reset');
        this.fields = Array.from(this.form.querySelectorAll('input'));
        this.errorMsg = this.form.querySelectorAll('span');
        this.addFormEvents();
        await cartController.init();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageForgotPass;
