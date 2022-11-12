
import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageModificar cargado.');

class PageModificar {

    static form
    static fields
    static btnCreate
    static btnUpdate
    static btnCancel

/*     
    static validators = {
        'id': /^[\da-f]{24}$/,
        'name': /^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/,
        'price': /^\d+$/,
        'description': /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,200}$/,
    };
 */

/*     static emptyForm() {
        PageAlta.fields.forEach(field => field.value = '');
    }
 */
/* 
    static completeForm(product) {
        PageAlta.fields.forEach(field => {
            field.value = product[field.name];
        });
    }
 */

/*     static validate(value, validator) {
        return validator.test(value);
    }

 */
/*     static validateForm() {
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
    } */


/*     static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        PageAlta.renderTemplateTable(products);
        return savedProduct;
    }
 */

/*     static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    } */



    static async addFormEvents() {
        
     /*    PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                PageAlta.emptyForm();
            }
        });

        this.btnCancel.addEventListener('click', e => {
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;
        });

        this.btnUpdate.addEventListener('click', async e => {
            const productToSave = PageAlta.validateForm();
            if (productToSave) {
                const updatedProduct = await PageAlta.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
            }
            PageAlta.emptyForm();
            PageAlta.btnCreate.disabled = false;
            PageAlta.btnUpdate.disabled = true;
            PageAlta.btnCancel.disabled = true;

        }); */
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
            // row.remove();
            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);    
            PageAlta.renderTemplateTable(products);
        };

        /*  
        const editProduct = async e => {
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const name = row.querySelector('.cell-name').innerHTML;
            const price = row.querySelector('.cell-price').innerHTML;
            const description = row.querySelector('.cell-description').innerHTML;
            const productToEdit = {};
            productToEdit.id = id;
            productToEdit.name = name;
            productToEdit.price = price;
            productToEdit.description = description;
            PageAlta.completeForm(productToEdit);
            PageAlta.btnCreate.disabled = true;
            PageAlta.btnUpdate.disabled = false;
            PageAlta.btnCancel.disabled = false;
        }; */

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                //deleteProduct(e);
                console.log("delete")
                return;
            }

            if (e.target.classList.contains('btn-edit')) {
                //editProduct(e);
                console.log("edit")
                return;
            }

            if (e.target.classList.contains('btn-view')) {
                //editProduct(e);
                console.log("modifica")
                return;
            }
        });
    }

    static async init () {
      /*   console.log('PageModifocar.init()');

        PageAlta.form = document.getElementById('form-alta-producto');
        PageAlta.fields = PageAlta.form.querySelectorAll('input, textarea');
        PageAlta.btnCreate = PageAlta.form.querySelector('#btn-create');
        PageAlta.btnUpdate = PageAlta.form.querySelector('#btn-update');
        PageAlta.btnCancel = PageAlta.form.querySelector('#btn-cancel');

        PageAlta.addFormEvents();
    */
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        
        await PageModificar.renderTemplateTable(products);
        PageModificar.addTableEvents(); 
    }
}

export default PageModificar;

