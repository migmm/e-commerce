
import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageModificar cargado.');

class PageModificar {

    static form
    static fields
    static btnUpdate

    static validators = {
        id: /^[\da-f]{24}$/,
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
        //addedDate: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        //lastSell: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        avatar: /^.+\.(jpe?g|gif|png)$/i,
        gallery: /[^]*/,
        colors: /^\s*([a-zA-Z0-9ÁáÉéÍíÓóÚúÑñ,.-_]+\s*){1,3}$/,
    };

        static emptyForm() {
            PageModificar.fields.forEach(field => field.value = '');
        }

        static completeForm(product) {
            PageModificar.fields.forEach(field => {
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

        static validate(value, validator) {
            return validator.test(value);
        }

    static validateForm() {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');

        for (const field of PageModificar.fields) {
            const validated = PageModificar.validate(field.value, PageModificar.validators[field.name]);
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
        // PageModificar.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageModificar.renderTemplateTable(products);
        return updatedProduct;
    }

    static async addFormEvents() {

        PageModificar.form.addEventListener('submit', async e => {

            e.preventDefault();

            const productToSave = PageModificar.validateForm();
            if (productToSave) {
                const updatedProduct = await PageModificar.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
            }
            PageModificar.emptyForm();
        });

        this.btnUpdate.addEventListener('click', async e => {
            const productToSave = PageModificar.validateForm();

            if (productToSave) {
                const updatedProduct = await PageModificar.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
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

            let freeShip = document.getElementById('freeShip');
            freeShip.value = false
            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            PageModificar.emptyForm();
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.products-table-container').innerHTML = html;
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
            PageModificar.renderTemplateTable(products);
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

            PageModificar.completeForm(productToEdit);
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                return;
            }

            if (e.target.classList.contains('btn-edit')) {
                editProduct(e);
                let formModifica = document.getElementsByClassName('product-update-wrapper')[0]
                formModifica.classList.add('product-update-wrapper--on')

                let top = document.getElementById('form-modifica').offsetTop - 100;
                window.scrollTo(0, top);

                return;
            }

            if (e.target.classList.contains('btn-view')) {
                return;
            }
        });
    }

    static async init() {
        console.log('PageModificar.init()');
        PageModificar.form = document.getElementById('form-add-products');
        PageModificar.fields = PageModificar.form.querySelectorAll(`textarea, input:not([type='file']`);
        PageModificar.btnUpdate = PageModificar.form.querySelector('#btn-update');
        console.log(PageModificar.fields)

        PageModificar.addFormEvents();

        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);

        await PageModificar.renderTemplateTable(products);
        PageModificar.addTableEvents();
    }
}

export default PageModificar;
