import toastComponent from '/js/modules/toast.js';

console.log('🆗: Módulo PageContacto cargado.');

class PageContacto {

    static form
    static fields

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

        for (const field of PageContacto.fields) {
            const validated = PageContacto.validate(field.value, PageContacto.validators[field.name]);
            console.log(field.name, validated);

            let errorField = document.getElementsByName(field.name)[0];
            let ancest = errorField.closest(".input-group__form-group");
            let spanElement = ancest.querySelector('span:last-child')

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
            toastComponent.toastNotification("Error! verifique los campos marcados!");
            return false;
        }
        return formToSend;
    }

    static async addFormEvents() {

        PageContacto.form.addEventListener('submit', async e => {
            e.preventDefault();

            const formToSend = PageContacto.validateForm();

            if (formToSend) {
             /*    const savedProduct = await PageContacto.saveProduct(dataProducts); */
                console.log('savedProduct:', savedProduct);
                PageContacto.emptyForm();
            }
        });
    }

    static async init () {
        console.log('PageContacto.init()');
        document.getElementById("name").focus();
        PageContacto.form = document.getElementById('form-contact');
        PageContacto.fields = PageContacto.form.querySelectorAll('textarea, input');
        PageContacto.addFormEvents();
        //goToTopAndCloseMenu ();
    }
}

export default PageContacto;