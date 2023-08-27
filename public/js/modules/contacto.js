import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class PageContacto {

    static form;
    static fields;

    static validators = {
        name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9 .,\"\'\s\/_-]{4,30}$/,
        phoneNumber: /^[0-9]*$/, //only numbers by now
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$/,
    };

    static emptyForm() {
        PageContacto.fields.forEach(field => field.value = '');
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
            const validated = this.validate(field.value, this.validators[field.name]);
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

        this.form.addEventListener('submit', async e => {
            e.preventDefault();

            const formToSend = this.validateForm();

            if (formToSend) {
             /*    const savedProduct = await this.saveProduct(dataProducts); */
                console.log('savedProduct:', savedProduct);
                this.emptyForm();
            }
        });
    }

    static async init () {

        goTopOnLoad.goToTopOnLoad();
        document.getElementById("name").focus();
        this.form = document.getElementById('form-contact');
        this.fields = this.form.querySelectorAll('textarea, input');
        this.addFormEvents();
        await cartController.init();
    }
}

export default PageContacto;