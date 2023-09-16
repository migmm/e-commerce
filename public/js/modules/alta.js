import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import { fetchAndRenderProducts } from '../utils/fetchAndRenderProducts.js';
import formUtils from '../utils/formProcessing.js'

class PageAlta {

    static form;
    static fields;

    static async addFormEvents() {
        const msgGlobalOK = document.getElementsByClassName('input-group__ok-form')[0];
        const btnSubmit = document.getElementById('btn-sendform');

        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const productToSave = Validations.validateForm(this.fields);
            

            if (productToSave) {
                formUtils.sendForm();
                formUtils.resetForm();
                msgGlobalOK.classList.add( 'input-group__ok-form--show');
            }

            setTimeout(function () {
                msgGlobalOK.classList.remove( 'input-group__ok-form--show');
            }, 5000);
        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();

        await fetchAndRenderProducts([], '.input-group', 'templates/form.hbs');
        await cartController.init();

        formUtils.initForm();
        formUtils.initImageDriver();

        this.fields = Array.from(document.querySelectorAll('input, textarea'));

        document.getElementById('productName-en').focus();
        this.addFormEvents();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageAlta;
