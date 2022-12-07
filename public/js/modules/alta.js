import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';

console.log('🆗: Módulo PageAlta cargado.');


class PageAlta {

    static form
    static fields

    static emptyForm() {
        const msgGlobalError = document.getElementsByClassName('input-group__error-form')[0];
        const msgGlobalOK = document.getElementsByClassName('input-group__ok-form')[0];
        PageAlta.fields.forEach(field => {
            field.value = ''
            setTimeout(function () {
                field.classList.remove('input-group__input--ok');
                msgGlobalOK.classList.remove( 'input-group__ok-form--show');
                msgGlobalError.classList.remove('input-group__error--show');
            }, 3000);
        });
    }

    

    static async saveProduct(product) {
        const mode = 'formdata';
        const savedProduct = await productController.saveProduct(product, mode);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        // PageAlta.renderTemplateTable(products);
        return savedProduct;
    }

    static async addFormEvents() {

        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            document.getElementById('addedDate').value = new Date().toISOString();
            document.getElementById('lastSell').value = new Date('1900-01-01').toISOString();

            let freeShip = document.getElementById('freeShip');
            freeShip.value = false;
            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            let ageYear = document.getElementById('ageYear');
            let ageSelect = document.getElementById('ageSelect');

            ageSelect.value = 0;

            if (ageYear.checked) {
                ageSelect.value = '1';
            }

            const productToSave = Validations.validateForm(PageAlta.fields);

            //Bypass to get the files too
            let dataProducts = new FormData(document.getElementById('form-add-products'));
            console.log(dataProducts);
            const colorsString = dataProducts.get('colors');
            dataProducts.delete('colors');
            dataProducts.delete('ageSelects');
            var colorsSplit = colorsString.split(',');
            colorsSplit.forEach((item) => dataProducts.append('colors[]', item))

            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(dataProducts);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });

        const inputMultipleFiles = document.querySelector('.file-gallery');
        inputMultipleFiles.addEventListener('change', (e) => {
            const files = inputMultipleFiles.files;

            if (files.length > 3) {
                let ancest = inputMultipleFiles.closest('.input-group__form-group');
                let spanElement = ancest.querySelector('span:last-child')
                spanElement.style.visibility = 'visible';
                inputMultipleFiles.value = '';
                return;
            }
            spanElement.style.visibility = 'hidden';
        });
    }

    static goToTopOnLoad() {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.classList.remove('scroll-smooth');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        htmlTag.classList.add('scroll-smooth');
    }

    static async init() {
        console.log('PageAlta.init()');
        PageAlta.goToTopOnLoad();
        PageAlta.form = document.getElementById('form-add-products');
        PageAlta.fields = PageAlta.form.querySelectorAll(`textarea, input:not([type='radio']`);
        PageAlta.addFormEvents();
        document.getElementById('productName').focus();
        console.log(PageAlta.fields);
        await cartController.init();
    }
}

export default PageAlta;