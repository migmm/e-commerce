
import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageModificar cargado.');

class PageModificar {

    static form
    static fields

    /*     
        static validators = {
            'id': /^[\da-f]{24}$/,
            'name': /^[\wáéíóúüÁÉÍÓÚÜ .,-]{1,30}$/,
            'price': /^\d+$/,
            'description': /^[\wáéíóúüÁÉÍÓÚÜ ¿?¡!.,:-]{1,200}$/,
        };
     */

        static emptyForm() {
            PageAlta.fields.forEach(field => field.value = '');
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
                        document.getElementById("ageMonth").checked = true;
                      
                    } else {
                        document.getElementById("ageYear").checked = true;
                    }
                    
                }
                    field.value = product[field.name];
                
                
                console.log(product[field.name])
            });
        }


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

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);
        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    }



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
    */
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
            // row.remove();
            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);
            PageModificar.renderTemplateTable(products);
        };


        const editProduct = async e => {
            const row = e.target.closest('tr');

            const id = row.dataset.id;
            console.log(id)
            const productName = row.querySelector('.table-content__cell-name').innerHTML;
            console.log(productName)
            const price = row.querySelector('.table-content__cell-price').innerHTML;
            console.log(price )
            const image = row.querySelector('.table-content__cell-image-container').innerHTML;
            console.log(price )
            const discountPercent = row.querySelector('.cell-discount-percent').innerHTML;
            console.log(discountPercent)
            const vendor = row.querySelector('.cell-vendor').innerHTML;
            console.log(vendor)
            const stock = row.querySelector('.table-content__cell-stock').innerHTML;
            console.log(stock)
            const category = row.querySelector('.cell-category').innerHTML
            console.log(category) 
            const shortDescription = row.querySelector('.table-content__cell-description').innerHTML;
            console.log(shortDescription)
            const longDescription = row.querySelector('.cell-long-description').innerHTML;
            console.log(longDescription)
            const freeShip = row.querySelector('.cell-free-ship').innerHTML;
            console.log(freeShip)
            const ageFrom = row.querySelector('.cell-age-from').innerHTML;
            console.log(ageFrom)
            const ageTo = row.querySelector('.cell-age-to').innerHTML;
            console.log(ageTo)
            const ageSelect = row.querySelector('.cell-age-select').innerHTML;
            console.log(ageSelect)
            const colors = row.querySelector('.cell-colors').innerHTML;
            console.log(colors)
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
            productToEdit.colors = colors;




            PageModificar.completeForm(productToEdit);
            /* 
            PageAlta.btnCreate.disabled = true;
            PageAlta.btnUpdate.disabled = false;
            PageAlta.btnCancel.disabled = false; */
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                console.log("delete")
                return;
            }

            if (e.target.classList.contains('btn-edit')) {
                editProduct(e);
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
    
    static async init() {
        console.log('PageModificar.init()');
        PageModificar.form = document.getElementById('form-add-products');
        PageModificar.fields = PageModificar.form.querySelectorAll(`textarea, input:not([type='file']`);

        console.log(PageModificar.fields)
       // PageModificar.fields.querySelectorAll(".file-avatar").forEach(e => e.remove());
       // document.querySelectorAll('.file-avatar').forEach(el => el.remove());
       //console.log(PageModificar.fields)
        /*   console.log('PageModifacar.init()');
  
          PageAlta.form = document.getElementById('form-alta-producto');
    
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

