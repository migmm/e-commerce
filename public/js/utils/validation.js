console.log('🆗: Módulo Validations cargado.');

class Validations {

    static validators = {
        productName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,30}$/,
        price: /^[0-9,]{1,30}$/,
        discountPercent: /^[0-9,]{1,30}$/,
        vendor: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,40}$/,
        stock: /^-?[0-9]{1,30}$/,
        category: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$/,
        shortDescription: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,80}$/,
        longDescription: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,2000}$/,
        freeShip: /^(?:tru|fals)e$/,
        ageFrom: /^[0-9]{1,3}$/,
        ageTo: /^[0-9]{1,3}$/,
        ageSelect: /^[0-1]{1,2}$/,
        addedDate: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        lastSell: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        avatar: /^.+\.(jpe?g|gif|png)$/i,
        gallery: /[^]*/,
        colors: /^\s*([a-zA-Z0-9ÁáÉéÍíÓóÚúÑñ,.-_]+\s*){1,3}$/,
    };

    static validate(value, validator) {
        return validator.test(value);
    }

    static validateForm(fields) {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');
        const msgGlobalError = document.getElementsByClassName('input-group__error-form')[0];
        const msgGlobalOK = document.getElementsByClassName('input-group__ok-form')[0];

        for (const field of fields) {
            const validated = Validations.validate(field.value, Validations.validators[field.name]);
            console.log(field.name, validated);

            let errorField = document.getElementsByName(field.name)[0];
            let ancest = errorField.closest('.input-group__form-group');
            let spanElement = ancest.querySelector('span:last-child');

            if (!validated) {
                errorField.classList.remove('input-group__input--ok');
                errorField.classList.add('input-group__input--error');
                spanElement.style.visibility = 'visible';

                allValidated = false;
                break;

            } else {
                productToSave[field.name] = field.value;

                errorField.classList.remove('input-group__input--error');
                errorField.classList.add('input-group__input--ok');
                spanElement.style.visibility = 'hidden';
            }
        }

        console.log('allValidated:', allValidated);

        if (!allValidated) {
            msgGlobalError.classList.add('input-group__error--show');
            return false;
        }
        msgGlobalError.classList.remove('input-group__error--show');
        msgGlobalOK.classList.add('input-group__ok-form--show');
        return productToSave;
    }

    static async init() {
        console.log('Validations.init()');
    }
}

export default Validations;