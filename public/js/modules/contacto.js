import toastComponent from '/js/modules/toast.js';

console.log('🆗: Módulo PageContacto cargado.');

class PageContacto {

    
    static form
    static fields

    static validators = {
        /*  productName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,30}$/,
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
        avatar: /^.+\.(jpe?g|gif|png)$/i, */
        //gallery: /[^]*/,
        //colors: /^\s*([a-zA-Z0-9ÁáÉéÍíÓóÚúÑñ,.-_]+\s*){1,3}$/,
        name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9 .,\"\'\s\/_-]{4,30}$/,
        phoneNumber: /^[0-9]*$/, //only numbers by now
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$/,
    };

    static emptyForm() {
        PageContacto.fields.forEach(field => field.value = '');
    }

/*     static completeForm(product) {
        PageContacto.fields.forEach(field => {
            field.value = product[field.name];
        });
    } */

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

    /*  static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        // PageContacto.renderTemplateTable(products);
        return savedProduct;
    }
 */

    /* static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageContacto.renderTemplateTable(products);
        return updatedProduct;
    }
 */

    static async addFormEvents() {

        PageContacto.form.addEventListener('submit', async e => {
            e.preventDefault();

          /*   document.getElementById('addedDate').value = new Date().toISOString();
            document.getElementById('lastSell').value = new Date('1900-01-01').toISOString();

            let freeShip = document.getElementById('freeShip');
            freeShip.value = false
            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            let ageYear = document.getElementById('ageYear');
            let ageMonth = document.getElementById('ageMonth');
            let ageSelect = document.getElementById('ageSelect');

            ageSelect.value = null

            if (ageYear.checked) {
                ageSelect.value = '1';
            }
            if (ageMonth.checked) {
                ageSelect.value = '0';
            } */

            const formToSend = PageContacto.validateForm();

            //Bypass to get the files too
            /*   let dataProducts = new FormData(document.getElementById("form-add-products"))
            console.log(dataProducts)
            const colorsString = dataProducts.get('colors');
            dataProducts.delete('colors');
            dataProducts.delete('ageSelects');
            var colorsSplit = colorsString.split(',');
            colorsSplit.forEach((item) => dataProducts.append("colors[]", item)) */


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


/* //////////////////////////////
//                          //
//      Form processing     //
//                          //
//////////////////////////////

// Regex validations. all constants starts with rx
// rxContactName, rxEmail and rxMessage refers to Contact form
function checkForm() {
    let miniumLength = "";
    let maxiumLength = "";
    const regexStrings = {
        rxName: "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,30}$",
        rxPrice: "^[0-9,]*$",
        rxVendor: "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,40}$",
        rxStock: "^-?[0-9]*$",
        rxCategory: "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$",
        rxShortDescription: "^.{5,80}$",
        rxLongDescription: "^.{5,2000}$",
        rxFreeShipping: "",
        rxAgeFrom: "^[0-9]*$",
        rxAgeTo: "^[0-9]*$",
        rxPhotos: "",
        rxContactName: "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9 .,\"\'\s\/_-]{4,30}$",
        rxEmail: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$",
        rxPhone: "^[0-9]*$", //only numbers by now
        rxMessage: "^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$",
    }

    const rxName = true
    const rxPrice = true
    const rxVendor = true
    const rxStock = true
    const rxCategory = true
    const rxShortDescription = true
    const rxLongDescription = 'verificar';
    const rxFreeShipping = '';
    const rxAgeFrom = true
    const rxAgeTo = true
    const rxPhotos = '';
    const rxContactName = '^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,30}$';
    const rxEmail = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
    const rxMessage = '^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,3000}$';

    let textarea = document.querySelector('textarea');
    let formSendBtn = document.querySelector('button[type=submit]');
    let inputsText = document.querySelectorAll('input'); // Required to form processing
    let error = document.querySelector('.input-group__error')

    inputsText.forEach((input) => {
        input.addEventListener('input', function () {
            var errorMsg = this.nextElementSibling
            var val = this.value;
            // Text treatment to match Regex const names
            let inputTextCheck = this.id;
            let txtArr = inputTextCheck.split('-');
            for (var i = 0; i < txtArr.length; i++) {
                txtArr[i] = txtArr[i].charAt(0).toUpperCase() + txtArr[i].slice(1);
            }
            inputTextCheck = txtArr.join('');
            inputTextCheck = inputTextCheck.replace('Product', '');
            inputTextCheck = 'rx' + inputTextCheck;
            var reg = new RegExp(regexStrings[inputTextCheck]);
            let testInput = reg.test(val);

            if (!testInput) {
                this.style.border = 'solid 1px #ff0000';

                errorMsg.classList.add('input-group__error--show');
            } else {
                this.style.border = 'solid 1px #2ecc71';
                errorMsg.classList.remove('input-group__error--show');
            }
        });
    });

    textarea.addEventListener('input', function () {
        var errorMsg = this.nextElementSibling;

        var val = this.value;
        // Text treatment to match Regex const names
        let inputTextCheck = this.id;
        let txtArr = inputTextCheck.split('-');
        for (var i = 0; i < txtArr.length; i++) {
            txtArr[i] = txtArr[i].charAt(0).toUpperCase() + txtArr[i].slice(1);
        }
        inputTextCheck = txtArr.join('');
        inputTextCheck = inputTextCheck.replace('Product', '');
        inputTextCheck = 'rx' + inputTextCheck;

        var reg = new RegExp(regexStrings[inputTextCheck]);
        let testInput = reg.test(val);

        if (!testInput) {
            this.style.border = 'solid 1px #ff0000';

            errorMsg.classList.add('input-group__error--show');
        } else {
            this.style.border = 'solid 1px #2ecc71';
            errorMsg.classList.remove('input-group__error--show');
        }
    });

    // Listener for "submit" button
    formSendBtn.addEventListener('click', function (e) {
        e.preventDefault();
    });

}
checkForm() */