import productService from '/js/services/product.js';

class ProductController {

    async getProduct(id) {
        // console.log('getProduct:', id);
        const product = await productService.getProduct(id);
        return product;
    }

    async getProducts() {
        // console.log('getProducts');
        const products = await productService.getProducts();
        return products;
    }
    
    async saveProduct(product) {
        // console.log('saveProduct:', product);

           //Bypass to get the files too
           let data = new FormData(document.getElementById("form-add-products"))
           console.log(data)
           const colorsString = data.get('colors');
           data.delete('colors');
           data.delete('ageSelects');
           var colorsSplit = colorsString.split(',');
           colorsSplit.forEach((item) => data.append("colors[]", item))


        const savedProduct = await productService.saveProduct(data);
        return savedProduct;
    }

    async updateProduct(id, product) {
        // console.log('updateProduct:', id, product);
        const updatedProduct = await productService.updateProduct(id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        // console.log('deleteProduct', id);
        const deletedProduct = await productService.deleteProduct(id);
        return deletedProduct;
    }
}

const productController = new ProductController();
export default productController;
