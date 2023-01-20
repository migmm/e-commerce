import productController from '/js/controllers/product.js';
import render from '/js/utils/render.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import Form from '../utils/form.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class PageModificar {

    static form
    static fields
    static btnUpdate
    static btnCancel
    static productFullView
    static productFullViewBg
    products = [];


    static completeForm(product) {
        this.fields.forEach(field => {
            if (field.name === 'freeShip') {
                if (product[field.name] === 'true') {
                    document.getElementById("freeShip").checked = true;
                }
            }

            if (field.name === 'ageSelect') {
                if (product[field.name] === '1') {
                    document.getElementById("ageYear").checked = true;

                } else {
                    document.getElementById("ageMonth").checked = true;
                }
            }
            field.value = product[field.name];
            console.log(product[field.name])
        });
    }

    static async updateProduct(product) {
        const mode = 'formdata';
        const updatedProduct = await productController.updateProduct(product.get('id'), product, mode);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        await render.renderTemplateCards(products, 'templates/products-table.hbs', '.products-table-container')
        return updatedProduct;
    }

    static async addFormEvents() {

        this.form.addEventListener('submit', async e => {

            e.preventDefault();

            let freeShip = document.getElementById('freeShip');
            freeShip.value = false;

            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            let ageYear = document.getElementById('ageYear');
            let ageSelect = document.getElementById('ageSelect');

            ageSelect.value = 0;

            if (ageYear.checked) {
                ageSelect.value = 1;
            }

            //const productToSave = this.validateForm();
            const productToSave = Validations.validateForm(this.fields);

            //Bypass to get the files too
            let dataProducts = new FormData(document.getElementById("form-add-products"));

            const colorsString = dataProducts.get('colors');
            dataProducts.delete('colors');
            dataProducts.delete('ageSelects');
            dataProducts.delete('ageSelect');
            dataProducts.append("ageSelect", ageSelect.value)
            var colorsSplit = colorsString.split(',');
            colorsSplit.forEach((item) => dataProducts.append("colors[]", item));

            if (productToSave) {
                const savedProduct = await this.updateProduct(dataProducts);
                console.log('savedProduct:', savedProduct);
                Form.emptyForm(this.fields);
            }
        });

        this.btnCancel.addEventListener('click', async e => {
            let formModifica = document.getElementsByClassName('product-update-wrapper')[0];
            formModifica.classList.remove('product-update-wrapper--on');
            Form.emptyForm(this.fields);
        });
    }

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

    static async addTableEvents() {
        const deleteProduct = async (e) => {
            if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
                return;
            }
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const deletedProduct = await productController.deleteProduct(id);
            console.log('Producto eliminado:', deletedProduct);

            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);
            await render.renderTemplateCards(products, 'templates/products-table.hbs', '.products-table-container')
        };

        const editProduct = async e => {
            const row = e.target.closest('tr');

            const id = row.dataset.id;
            const productName = row.querySelector('.table-content__cell-name').innerHTML;
            const price = row.querySelector('.table-content__cell-price').innerHTML;
            const image = row.querySelector('.table-content__cell-image-container').innerHTML;
            const discountPercent = row.querySelector('.cell-discount-percent').innerHTML;
            const vendor = row.querySelector('.cell-vendor').innerHTML;
            const stock = row.querySelector('.table-content__cell-stock').innerHTML;
            const category = row.querySelector('.cell-category').innerHTML
            const shortDescription = row.querySelector('.table-content__cell-description').innerHTML;
            const longDescription = row.querySelector('.cell-long-description').innerHTML;
            const freeShip = row.querySelector('.cell-free-ship').innerHTML;
            const ageFrom = row.querySelector('.cell-age-from').innerHTML;
            const ageTo = row.querySelector('.cell-age-to').innerHTML;
            const ageSelect = row.querySelector('.cell-age-select').innerHTML;
            const colors = row.querySelector('.cell-colors').innerHTML;
            const productToEdit = {};

            productToEdit.id = id;
            productToEdit.productName = productName;
            productToEdit.price = price;
            //productToEdit.image = image;
            productToEdit.discountPercent = discountPercent;
            productToEdit.vendor = vendor;
            productToEdit.stock = stock;
            productToEdit.category = category;
            productToEdit.price = price;
            productToEdit.shortDescription = shortDescription;
            productToEdit.longDescription = longDescription;
            productToEdit.freeShip = freeShip;
            productToEdit.ageFrom = ageFrom;
            productToEdit.ageTo = ageTo;
            productToEdit.ageSelect = ageSelect;
            productToEdit.colors = colors;

            this.completeForm(productToEdit);
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                return;
            }

            if (e.target.classList.contains('btn-edit')) {
                editProduct(e);
                let formModifica = document.getElementsByClassName('product-update-wrapper')[0];
                formModifica.classList.add('product-update-wrapper--on');

                let top = document.getElementById('form-modifica').offsetTop - 100;
                window.scrollTo(0, top);

                this.fields.forEach(function (field) {
                    field.classList.remove('input-group__input--ok');
                });

                return;
            }

            if (e.target.classList.contains('btn-view')) {
                /* 
                const row = e.target.closest('tr');
                const id = row.dataset.id;
                var productIndex = this.products.findIndex(item => item.id === id);
                let product = this.products[productIndex]

                this.productView(product); 
                */
                return;
            }
        });
    }

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        this.form = document.getElementById('form-add-products');
        this.fields = this.form.querySelectorAll(`textarea, input:not([type='file']`);
        this.btnUpdate = this.form.querySelector('#btn-update');
        this.btnCancel = this.form.querySelector('#btn-cancel');
        console.log(this.fields);

        this.addFormEvents();
        this.keyEvents();
        this.products = await productController.getProducts();
        console.log(`Se encontraron ${this.products.length} productos`);

        await render.renderTemplateCards(this.products, 'templates/products-table.hbs', '.products-table-container')
        this.addTableEvents();
        await cartController.init();
    }
}

export default PageModificar;
