import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageAlta cargado.');

class PageAlta {

    static async init () {
        console.log('PageAlta.init()');
        document.getElementById('productName').focus();
        //goToTopAndCloseMenu ();
    }


    
    static form
    static fields
    static btnCreate
    static btnUpdate
    static btnCancel

    static validators = {
        productName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,30}$/,
        price: /^[0-9,]*$/,
        discountPercent: /^[0-9,]*$/,
        vendor: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,40}$/,
        stock: /^-?[0-9]*$/,
        category: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$/,
        shortDescription: /^.{5,80}$/,
        longDescription: /^.{5,2000}$/,
        freeShip: '',
        ageFrom: /^[0-9]*$/,
        ageTo: /^[0-9]*$/,
        photos: '',
        addedDate: '',
        lastSell: '',
        images: '',
        colors: '',
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

    /*    for (const field of PageAlta.fields) {
            const validated = PageAlta.validate(field.value, PageAlta.validators[field.name]);
            console.log(field.name, validated);
            if (!validated) {
                allValidated = false;
                break;
            } else {
                productToSave[field.name] = field.value;
            }
        } 
    */

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
        PageAlta.renderTemplateTable(products);
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
            PageAlta.actualDate = document.getElementById('addedDate').value = new Date().toISOString();
            PageAlta.lastSell = document.getElementById('lastSell').value = new Date('1900-01-01').toISOString();

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });
    }
}

export default PageAlta;