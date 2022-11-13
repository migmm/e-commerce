import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageAlta cargado.');

const imgSelect = document.querySelectorAll('.img-select__img-container');
imgSelect.forEach(function (image) {
    image.addEventListener('click', (e) => {
        e.preventDefault();
        const bigImg = document.querySelector('.img-display__img-big');
        bigImg.src = e.target.src;
    })
})

class PageAlta {

    static form
    static fields

    static validators = {
        productName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,30}$/,
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

    static emptyForm() {
        PageAlta.fields.forEach(field => field.value = '');
    }

    static completeForm(product) {
        PageAlta.fields.forEach(field => {
            field.value = product[field.name];
        });
    }

    static validate(value, validator) {
        return validator.test(value);
    }


    static validateForm() {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');

        for (const field of PageAlta.fields) {
            const validated = PageAlta.validate(field.value, PageAlta.validators[field.name]);
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

                productToSave[field.name] = field.value;

                errorField.classList.remove("input-group__input--error");
                errorField.classList.add("input-group__input--ok");
                spanElement.style.visibility = 'hidden';
            }
        }

        console.log('allValidated:', allValidated);
        if (!allValidated) {
            return false;
        }
        return productToSave;
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        // PageAlta.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    }

    static async addFormEvents() {

        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            document.getElementById('addedDate').value = new Date().toISOString();
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
            } 

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });
    }

    static async init() {
        console.log('PageAlta.init()');
        PageAlta.form = document.getElementById('form-add-products');
        // PageAlta.fields = PageAlta.form.querySelectorAll('input, textarea');
        PageAlta.fields = PageAlta.form.querySelectorAll(`textarea, input:not([type='radio']`);
        PageAlta.addFormEvents();
        document.getElementById('productName').focus();
        console.log(PageAlta.fields)

        //goToTopAndCloseMenu ();
    }

}

export default PageAlta;