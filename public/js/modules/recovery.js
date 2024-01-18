import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import recoveryController from '../controllers/recovery.js';
import render from '/js/utils/render.js';

class PageRecovery {

    static form;
    static fields;

    static validators = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    };

    static emptyForm() {
        PageRecovery.fields.forEach(field => field.value = '');
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
            let validated = false;

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

        PageRecovery.form.addEventListener('submit', async e => {
            e.preventDefault();

            
            if (this.validateForm()) {

                const data = {};
                PageRecovery.fields.forEach(field => {
                    data[field.name] = field.value;
                });

                const mode = 'json';
                const login = await recoveryController.passwordRecovery(data, mode);

                if (login.status === 200) {
                    await render.renderTemplateCards('', 'templates/recovery-sended.hbs', '.form-container');
                    this.getResendButton()
                    return;
                }

                this.errorMsg[2].style.visibility = "visible";
                PageRecovery.form.reset();
                return;
            }
        });
    }

    static getResendButton() {
        const resendButton = document.getElementById('recovery-resend-button');
            if (resendButton) {

                resendButton.addEventListener('click', () => {
                    location.reload();
                });
            }

    };

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        document.getElementById('email').focus();
        this.form = document.getElementById('form-reset');
        this.fields = this.form.querySelectorAll('input');
        this.addFormEvents();
        await cartController.init();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageRecovery;