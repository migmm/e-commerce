import http from '/js/clients/http.client.js';

class ProductService {
    
    URL_PRODUCTOS = '/api/products/'

    async getProduct(id) {
        const product = await http.get(this.URL_PRODUCTOS, id);
        return product;
    }

    async getProducts(lang) {
        const products = await http.get(this.URL_PRODUCTOS, lang);
        return products;
    }

    async saveProduct(product, mode) {
        const savedProduct = await http.post(this.URL_PRODUCTOS, product, mode);
        return savedProduct;
    }

    async updateProduct(id, product, mode) {
        const updatedProduct = await http.put(this.URL_PRODUCTOS, id, product, mode);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.URL_PRODUCTOS, id);
        return deletedProduct;
    }
}

const productService = new ProductService();

export default productService;
