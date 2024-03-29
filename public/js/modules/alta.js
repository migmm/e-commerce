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
        const msgGlobalError = document.getElementsByClassName('input-group__error-form')[0];
        const btnSubmit = document.getElementById('btn-sendform');
    
        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
    
            const productToSave = Validations.validateForm(this.fields);
    
            if (productToSave) {
                formUtils.sendForm().then(statusCode => {
                    console.log("satus code", statusCode)
                    if (statusCode === 201) {
                        formUtils.resetForm();
                        msgGlobalOK.classList.add('input-group__ok-form--show');
                        msgGlobalError.classList.remove('input-group__ok-form--show');

                        setTimeout(function () {
                            msgGlobalOK.classList.remove('input-group__ok-form--show');
                        }, 5000);
                    } else {
                        msgGlobalError.classList.add('input-group__ok-form--show');
                    }
                }).catch(error => {
                    console.error("Error sending form:", error);
                });
            }
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
