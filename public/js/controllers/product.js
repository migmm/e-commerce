import productService from '/js/services/product.js';

class ProductController {

    async getProduct(id) {
        const product = await productService.getProduct(id);
        return product;
    }

    async getProducts(lang, query) {
        const products = await productService.getProducts(lang, query);
        return products;
    }

    async saveProduct(product, mode) {
        const savedProduct = await productService.saveProduct(product, mode);
        return savedProduct;
    }

    async updateProduct(id, product, mode) {
        const updatedProduct = await productService.updateProduct(id, product, mode);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await productService.deleteProduct(id);
        return deletedProduct;
    }
}

const productController = new ProductController();
export default productController;
