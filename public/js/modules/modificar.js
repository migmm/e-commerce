import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import { fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';
import formUtils from '../utils/formProcessing.js'


class PageModificar {

    static form;
    static fields;
    static btnCancel;
    static productFullView;
    static productFullViewBg;
    products = [];

    static async addFormEvents() {
        await fetchAndRenderProducts([], '.input-group', 'templates/form.hbs');
        formUtils.initForm();
        formUtils.initImageDriver();

        const btnSubmit = document.getElementById('btn-sendform');
        const btnCancel = document.getElementById("btn-cancel");

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

        btnCancel.addEventListener('click', async e => {
            const formModifica = document.getElementsByClassName('product-update-wrapper')[0];
            formModifica.classList.remove('product-update-wrapper--on');
            window.scrollTo(0, 0);
        });
    }

    static async addTableEvents() {

        const deleteProduct = async (e) => {
            const deleteMessage = document.getElementById('product-delete-button');
            const confirmMessage = deleteMessage.innerHTML;
    
            if (!confirm (confirmMessage)) {
                return;
            }

            const row = e.target.closest('tr');
            const id = row.dataset.id;
            var productRow = document.querySelector(`tr[data-id="${id}"]`);
            productRow.parentNode.removeChild(productRow);

            const deletedProduct = await productController.deleteProduct(id);
            console.log('Producto eliminado:', deletedProduct);

            const query = await queryFunction()
            await fetchAndRenderProducts(query, '.products-table-container', 'templates/products-table.hbs');
            return;
        };

        document.querySelector('.products-table-container').addEventListener('click', async e => {

            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                return;
            }

            if (e.target.classList.contains('btn-edit')) {

                const formModifica = document.getElementsByClassName('product-update-wrapper')[0];
                formModifica.classList.add('product-update-wrapper--on');

                let top = formModifica.offsetTop - 200;
                window.scrollTo(0, top);

                const btnSendForm = document.getElementById("btn-sendform");
                const btnCancel = document.getElementById("btn-cancel");

                btnSendForm.textContent = "Modificar";
                btnSendForm.setAttribute("data-lang", "form-product-modify-product");

                btnCancel.textContent = "Cancelar";
                btnCancel.setAttribute("data-lang", "form-product-cancel-modification");

                await fetchLanguageData.fetchLanguageData();
            }
                if (e.target.classList.contains('btn-view')) {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;
                    var productIndex = this.products.findIndex(item => item.id === id);
                    let product = this.products[productIndex]

                    this.productView(product);
                    return;
                }
        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();

        const query = await queryFunction()
        await fetchAndRenderProducts(query, '.products-table-container', 'templates/products-table.hbs');

        this.addTableEvents();
        await cartController.init();
        this.addFormEvents();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageModificar;