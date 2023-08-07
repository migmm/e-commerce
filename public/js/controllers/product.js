import productService from '/js/services/product.js';

class ProductController {

    async getProduct(id) {
        // console.log('getProduct:', id);
        const product = await productService.getProduct(id);
        return product;
    }

    async getProducts(lang) {
        // console.log('getProducts');
        const products = await productService.getProducts(lang);
        return products;
    }

    async saveProduct(product, mode) {
        // console.log('saveProduct:', product);
        const savedProduct = await productService.saveProduct(product, mode);
        return savedProduct;
    }

    async updateProduct(id, product, mode) {
        // console.log('updateProduct:', id, product);
        const updatedProduct = await productService.updateProduct(id, product, mode);
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
