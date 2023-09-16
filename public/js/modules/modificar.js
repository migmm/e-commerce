import productController from '/js/controllers/product.js';
import render from '/js/utils/render.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import Form from '../utils/form.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
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

        btnSubmit.addEventListener('submit', async e => {
            e.preventDefault();
        });

        btnCancel.addEventListener('click', async e => {
            const formModifica = document.getElementsByClassName('product-update-wrapper')[0];
            formModifica.classList.remove('product-update-wrapper--on');
            window.scrollTo(0, 0);
        });
    }

    /* 
        static async productView(product) {
            const hbsFile = await fetch('templates/product-full-view.hbs').then(r => r.text());
            const template = Handlebars.compile(hbsFile);
            const html = template({ product });
            document.querySelector('.full-product-view').innerHTML = html;
            this.productFullView = document.querySelector('.product-full-view');
            this.productFullViewBg = document.querySelector('.full-product-view');
            this.productFullView.classList.add('product-full-view--on');
            this.productFullViewBg.classList.add('product-full-view-bg--on');
        }
    
        static keyEvents() {
            document.addEventListener('click', e => {
    
                // Click on background dark and product view is closed
                if (e.target.classList.value === 'full-product-view product-full-view-bg--on') {
                    this.productFullView.classList.remove('product-full-view--on');
                    this.productFullViewBg.classList.remove('product-full-view-bg--on');
                    return;
                }
    
                // Click on X to close product view
                if (e.target.classList.value === 'fa fa-times fa-2x') {
                    this.productFullView.classList.remove('product-full-view--on');
                    this.productFullViewBg.classList.remove('product-full-view-bg--on');
                    return;
                }
    
                // Click on image thumbnail to see full image
                if (e.target.parentNode.classList.value === 'img-select__img-container') {
                    let bigImg = document.getElementsByClassName('img-display__img-big')[0];
                    bigImg.src = e.target.src;
                    return;
                }
            });
    
            document.addEventListener('keydown', e => {
                if (e.key == 'Escape') {
                    if (this.productFullViewBg) {
                        this.productFullView.classList.remove('product-full-view--on');
                        this.productFullViewBg.classList.remove('product-full-view-bg--on');
                    }
                }
            });
        }
     */
    static async addTableEvents() {

        const deleteProduct = async (e) => {

            if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
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

                if (e.target.classList.contains('btn-view')) {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;
                    var productIndex = this.products.findIndex(item => item.id === id);
                    let product = this.products[productIndex]

                    this.productView(product);
                    return;
                }
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
    }
}

export default PageModificar;