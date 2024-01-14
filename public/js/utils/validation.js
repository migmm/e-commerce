console.log('🆗: Módulo Validations cargado.');

const fieldMappings = {
    productName: ['productName[en]', 'productName[es]'],
    shortDescription: ['shortDescription[en]', 'shortDescription[es]'],
    longDescription: ['longDescription[en]', 'longDescription[es]'],
};

class Validations {

    static validators = {
        id: /[A-Za-z0-9]?/,
        productName: /^[¡¿\w\W\d.,:;()"'\s–’″!?-]{5,100}$/,
        price: /^\d{1,20}(\.\d{1,2})?$/,
        tax: /^(1000(\.00?)?|\d{1,3}(,\d{3})*(\.\d{1,2})?)$/,
        vat: /^(1000(\.00?)?|\d{1,3}(,\d{3})*(\.\d{1,2})?)$/,
        discountPercent: /^(1000(\.00?)?|\d{1,3}(,\d{3})*(\.\d{1,2})?)$/,
        vendor: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,40}$/,
        stock: /^-?[0-9]{1,30}$/,
        category: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$/,
        shortDescription: /^[¡¿\w\W\d.,:;()"'\s–’″!?-]{5,200}$/,
        longDescription: /^[¡¿\w\W\d.,:;()"'\s–’″!?-]{5,8000}$/,
        ageFrom: /^(?:[1-9]|[1-9][0-9])$/,
        ageTo: /^(?:[1-9]|[1-9][0-9])$/,
    };

    static validate(value, validator) {

        // if field is "undefined" do nothing
        // eg. radio or checkboxes that will be adapted later

        if (value !== undefined) {
            console.log(value, validator)
            return validator.test(value);
        }
    }

    static validateForm(fields) {
        let allValidated = true;
        const productToSave = {};

        for (const mainField in fieldMappings) {
            const languageFields = fieldMappings[mainField];
            const fieldValues = {};

            let languageFieldsValid = true;
            const errorElement = document.querySelector(`[data-lang="form-product-${mainField}-error"]`);

            for (const languageField of languageFields) {
                const field = fields.find(f => f.name === languageField);
                if (field) {
                    fieldValues[languageField] = field.value;

                    const validator = Validations.validators[mainField];
                    const validated = Validations.validate(field.value, validator);
                    if (!validated) {
                        languageFieldsValid = false;
                        console.log(`Error en el campo ${languageField}`);
                    }
                }
            }

            if (!languageFieldsValid) {
                allValidated = false;
                errorElement.style.visibility = 'visible';
            } else {
                productToSave[mainField] = fieldValues;
                errorElement.style.visibility = 'hidden';
            }
        }

        for (const field of fields) {
            const validator = Validations.validators[field.name];
            if (validator) {
                const validated = Validations.validate(field.value, validator);
                const errorElement = document.querySelector(`[data-lang="form-product-${field.name}-error"]`);
                if (!validated) {
                    console.log(field.name)
                    
                    allValidated = false;
                    errorElement.style.visibility = 'visible';
                    console.log(`Error en el campo ${field.name}`);
                } else {
                    productToSave[field.name] = field.value;
                    errorElement.style.visibility = 'hidden';
                }
            }
        }

        const radioFields = fields.filter(field => field.type === 'radio');
        const checkedRadio = radioFields.find(field => field.checked);
        const errorElement = document.querySelector(`[data-lang="form-product-months-years-error"]`);

        if (!checkedRadio) {
            allValidated = false;
            console.log('Error: Debe seleccionar un radio');
            errorElement.style.visibility = 'visible';
        } else {
            productToSave[checkedRadio.name] = checkedRadio.value;
            errorElement.style.visibility = 'hidden';
        }

        return allValidated;
    }

    static async init() {
        console.log('Validations.init()');
    }
}

export default Validations;

