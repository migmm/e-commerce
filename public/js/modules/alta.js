import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageAlta cargado.');

class PageAlta {

    static form
    static fields

    static validators = {
        productName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,30}$/,
        price: /^[0-9,]*$/,
        discountPercent: /^[0-9,]*$/,
        vendor: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,40}$/,
        stock: /^-?[0-9]*$/,
        category: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{5,50}$/,
        shortDescription: /^.{5,80}$/,
        longDescription: /^.{5,2000}$/,
        freeShip: /^(?:tru|fals)e$/,
        ageFrom: /^[0-9]*$/,
        ageTo: /^[0-9]*$/,
        ageSelect: /^[0-1]*$/,
        addedDate: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        lastSell: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/,
        images: /[^]*/,
        colors: /^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-]{4,20}$/,
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
            if (!validated) {
                allValidated = false;
                break;
            } else {
                productToSave[field.name] = field.value;
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
            console.log("fdfddf" , freeShip.checked)
            if (freeShip.checked){
                freeShip.value = "true";
            }

            let files = document.getElementById('images').files;
            files.value = JSON.stringify(files.value);
            console.log("filezz", files.value);

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });
    }

    static async init () {
        console.log('PageAlta.init()');
        PageAlta.form = document.getElementById('form-add-products');
        PageAlta.fields = PageAlta.form.querySelectorAll('input, textarea');


        

        PageAlta.addFormEvents();
        document.getElementById('productName').focus();
        //goToTopAndCloseMenu ();
    }

}

export default PageAlta;