import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import Form from '../utils/form.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import generateId from '../utils/generateId.js';
import render from '/js/utils/render.js';


class PageAlta {

    static form
    static fields

    static async saveProduct(product) {
        const mode = 'formdata';
        const savedProduct = await productController.saveProduct(product, mode);
        return savedProduct;
    }

    static async addFormEvents() {

        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            document.getElementById('addedDate').value = new Date().toISOString();
            document.getElementById('lastSell').value = new Date('1900-01-01').toISOString();

            // Generate url name 
            let urlName = document.getElementById('urlName')
            const productName = document.getElementById('productName')
            urlName.value = productName.value + '-' + generateId.makeid(6);
            urlName.value = urlName.value.split(' ').join('-')
            console.log ("urlname" , urlName.value)

            // Free ship value adaptation to backend
            let freeShip = document.getElementById('freeShip');

            freeShip.value = false;
            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            // Age select and year values adaptation to backend
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
                Form.emptyForm(this.fields);
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

    static async init() {
        goTopOnLoad.goToTopOnLoad();

        // Empty constant to tell render that only show form
        const showOnly = null;
        await render.renderTemplateCards(showOnly, 'templates/form.hbs', '.input-group')
        
        this.form = document.getElementById('form-add-products');
        this.fields = this.form.querySelectorAll(`textarea, input:not([type='radio']`);
        this.addFormEvents();
        
        document.getElementById('productName').focus();
        await cartController.init();
    }
}

export default PageAlta;